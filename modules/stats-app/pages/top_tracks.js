import { S } from "/modules/std/index.js";
const { React } = S;
import PageContainer from "../shared/components/page_container.js";
import Tracklist from "../components/tracklist.js";
import useDropdown from "../shared/dropdown/useDropdownMenu.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
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
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: true }), S.React.createElement(SettingsButton, { section: "stats" })],
        infoToCreatePlaylist: {
            playlistName: `Top Songs - ${activeOption}`,
            itemsUris: topTracks.map(track => track.uri),
        },
    };
    return (S.React.createElement(PageContainer, { ...pageContainerProps },
        S.React.createElement(Tracklist, null, topTracks.map((track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index + 1, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.image, isExplicit: track.explicit, albumOrShow: { type: "album", name: track.album, uri: track.album_uri }, duration_ms: track.duration }))))));
};
export default React.memo(TracksPage);
