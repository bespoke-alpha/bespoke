import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;

import useDropdown from "../components/dropdown/useDropdown.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import PageContainer from "../components/shared/page_container.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import SettingsButton from "../components/buttons/settings_button.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import { spotifyApi } from "../../delulib/api.js";

import { SpotifyTimeRange } from "../api/spotify.js";
import Status from "../components/shared/status.js";

const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"] as const;
const OptionToTimeRange = {
	"Past Month": SpotifyTimeRange.Short,
	"Past 6 Months": SpotifyTimeRange.Medium,
	"All Time": SpotifyTimeRange.Long,
} as const;

export const fetchTopArtists = (timeRange: SpotifyTimeRange) => spotifyApi.currentUser.topItems("artists", timeRange, 50, 0);

const ArtistsPage = () => {
	const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-artists");
	const timeRange = OptionToTimeRange[activeOption];

	const { status, error, data, refetch } = S.ReactQuery.useQuery({
		queryKey: ["topArtists", timeRange],
		queryFn: () => fetchTopArtists(timeRange),
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

	const topArtists = data.items;

	const PageContainerProps = {
		title: "Top Artists",
		headerEls: [dropdown, <RefreshButton refresh={refetch} />, <SettingsButton section="Statistics" />],
	};

	return (
		<PageContainer {...PageContainerProps}>
			<div className={"main-gridContainer-gridContainer grid"}>
				{topArtists.map((artist, index) => (
					<SpotifyCard
						type={"artist"}
						uri={artist.uri}
						header={artist.name}
						subheader={`#${index + 1} Artist`}
						imageUrl={artist.images.at(-1)?.url ?? DEFAULT_TRACK_IMG}
					/>
				))}
			</div>
		</PageContainer>
	);
};

export default React.memo(ArtistsPage);
