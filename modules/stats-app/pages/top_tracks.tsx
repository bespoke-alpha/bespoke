import { S } from "/modules/std/index.js";
const { React } = S;

import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import Tracklist from "../components/tracklist.js";
import useDropdown from "../shared/dropdown/useDropdownMenu.js";
import { apiRequest, updatePageCache, checkLiked, convertTrackData } from "../funcs.js";
import { ConfigWrapper, Track } from "../types/stats_types.js";
import { LASTFM, SPOTIFY } from "../endpoints.js";
import { PLACEHOLDER } from "../constants.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
import { CONFIG } from "../settings.js";

const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
	"Past Month": "short_term",
	"Past 6 Months": "medium_term",
	"All Time": "long_term",
};

const TracksPage = () => {
	const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-tracks");
	const timeRange = OptionToTimeRange[activeOption];

	const pageContainerProps = {
		title: "Top Tracks",
		headerEls: [dropdown, <RefreshButton callback={} />, <SettingsButton section="stats" />],
		infoToCreatePlaylist: {
			playlistName: `Top Songs - ${activeOption}`,
			itemsUris: topTracks.map(track => track.uri),
		},
	};

	return (
		<PageContainer {...pageContainerProps}>
			<Tracklist>
				{topTracks.map((track: Track, index) => (
					<S.ReactComponents.TracklistRow
						index={index + 1}
						uri={track.uri}
						name={track.name}
						artists={track.artists}
						imgUrl={track.image}
						isExplicit={track.explicit}
						albumOrShow={{ type: "album", name: track.album, uri: track.album_uri }}
						duration_ms={track.duration}
					/>
				))}
			</Tracklist>
		</PageContainer>
	);
};

export default React.memo(TracksPage);
