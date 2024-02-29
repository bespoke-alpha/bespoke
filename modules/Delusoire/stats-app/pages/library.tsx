import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;

import useDropdown from "../components/shared/dropdown/useDropdownMenu.js";
import StatCard from "../components/cards/stat_card.js";
import ContributionChart from "../components/cards/contribution_chart.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import InlineGrid from "../components/inline_grid.js";
import PageContainer from "../components/shared/page_container.js";
import Shelf from "../components/shelf.js";
import RefreshButton from "../components/shared/buttons/refresh_button.js";
import SettingsButton from "../components/shared/settings_button.js";
import { SpotifyTimeRange } from "../api/spotify.js";
import { db, getTracksFromURIs } from "/modules/Delusoire/library-db/db.js";
import { PlaylistItems } from "../../library-db/listeners.js";
import { fp } from "/modules/Delusoire/std/deps.js";

const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"] as const;
const OptionToTimeRange = {
	"Past Month": SpotifyTimeRange.Short,
	"Past 6 Months": SpotifyTimeRange.Medium,
	"All Time": SpotifyTimeRange.Long,
} as const;

const LibraryPage = () => {
	const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-genres");
	const timeRange = OptionToTimeRange[activeOption];

	const { isLoading, error, data, refetch } = S.ReactQuery.useQuery({
		queryKey: ["libraryAnaysis", timeRange],
		queryFn: async () => {
			const trackURIsInLibrary = Object.entries(PlaylistItems)
				.map(([k, v]) => v?.size && k)
				.filter(Boolean);
			const tracksInLibrary = await getTracksFromURIs(trackURIsInLibrary);

			const duration = tracksInLibrary.map(track => track.duration_ms).reduce(fp.add);
			// duration, popularity, albums, artists
		},
	});

	if (isLoading) {
		return "Loading";
	}

	if (error) {
		return "Error";
	}

	const { genres, artists, albums, playlists, duration, releaseDates, tracks, audioFeatures } = data;

	const PageContainerProps = {
		title: "Library Analysis",
		headerEls: [dropdown, <RefreshButton refresh={refetch} />, <SettingsButton section="stats" />],
	};

	const statCards = Object.entries(audioFeatures).map(([key, value]) => {
		return <StatCard label={key} value={value} />;
	});

	const artistCards = artists.slice(0, 10).map(artist => {
		return <SpotifyCard type="artist" uri={artist.uri} header={artist.name} subheader={`Appears in ${artist.freq} tracks`} imageUrl={artist.image} />;
	});

	const albumCards = albums.map(album => {
		return <SpotifyCard type="album" uri={album.uri} header={album.name} subheader={`Appears in ${album.freq} tracks`} imageUrl={album.image} />;
	});

	return (
		<PageContainer {...PageContainerProps}>
			<section className="stats-libraryOverview">
				<StatCard label="Total Playlists" value={playlists.length} />
				<StatCard label="Total Tracks" value={tracks.length} />
				<StatCard label="Total Artists" value={artists.length} />
				<StatCard label="Total Minutes" value={Math.floor(duration / 60)} />
				<StatCard label="Total Hours" value={duration / 60 / 60} />
			</section>
			<Shelf title="Most Frequent Genres">
				<ContributionChart contributions={genres} />
				<InlineGrid special>{statCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Artists">
				<InlineGrid>{artistCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Albums">
				<InlineGrid>{albumCards}</InlineGrid>
			</Shelf>
			<Shelf title="Release Year Distribution">
				<ContributionChart contributions={releaseDates} />
			</Shelf>
		</PageContainer>
	);
};

export default React.memo(LibraryPage);
