import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;

import useDropdown from "../components/dropdown/useDropdownMenu.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import PageContainer from "../components/shared/page_container.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../components/buttons/settings_button.js";
import { CONFIG } from "../settings.js";
import { fetchLFMTopAlbums } from "../api/lastfm.js";
import { spotifyApi } from "../../delulib/api.js";
import { DEFAULT_TRACK_IMG } from "../static.js";

import { SpotifyTimeRange } from "../api/spotify.js";
import Status from "../components/shared/status.js";

const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"] as const;
const OptionToTimeRange = {
	"Past Month": SpotifyTimeRange.Short,
	"Past 6 Months": SpotifyTimeRange.Medium,
	"All Time": SpotifyTimeRange.Long,
} as const;

const AlbumsPage = () => {
	const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-artists");
	const timeRange = OptionToTimeRange[activeOption];

	const {
		status,
		error,
		data: topAlbums,
		refetch,
	} = S.ReactQuery.useQuery({
		queryKey: ["topAlbums", CONFIG.LFMUsername, timeRange],
		queryFn: async () => {
			const { topalbums } = await fetchLFMTopAlbums(CONFIG.LFMApiKey)(CONFIG.LFMUsername, timeRange);
			return await Promise.all(
				topalbums.album.map(async album => {
					const matchingSpotifyAlbums = await spotifyApi.search(`${album.name}+artist:${encodeURIComponent(album.artist.name)}`, ["album"]);
					return matchingSpotifyAlbums.albums.items[0];
				}),
			);
		},
	});

	switch (status) {
		case "pending": {
			return <Status icon="library" heading="Loading" subheading="This operation is taking longer than expected." />;
		}
		case "error": {
			// TODO: use module's logger
			console.error(error);
			return <Status icon="error" heading="Problem occured" subheading="Please make sure that all your settings are valid." />;
		}
	}

	const props = {
		title: "Top Albums",
		headerEls: [dropdown, <RefreshButton refresh={refetch} />, <SettingsButton section="Statistics" />],
	};

	const albumCards = topAlbums.map((album, index) => {
		const type = album.uri.startsWith("https") ? "lastfm" : "album";
		return (
			<SpotifyCard
				type={type}
				uri={album.uri}
				header={album.name}
				subheader={`#${index + 1} Album`}
				imageUrl={album.images[0]?.url ?? DEFAULT_TRACK_IMG}
			/>
		);
	});

	return (
		<PageContainer {...props}>
			<div className={"main-gridContainer-gridContainer grid"}>{albumCards}</div>
		</PageContainer>
	);
};

export default React.memo(AlbumsPage);
