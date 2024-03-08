import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import PageContainer from "../components/shared/page_container.js";
import useDropdown from "../components/dropdown/useDropdown.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import { spotifyApi } from "../../delulib/api.js";
import { SpotifyTimeRange } from "../api/spotify.js";
import { useStatus } from "../components/status/useStatus.js";
import { logger, settingsButton } from "../index.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": SpotifyTimeRange.Short,
    "Past 6 Months": SpotifyTimeRange.Medium,
    "All Time": SpotifyTimeRange.Long,
};
const columns = ["INDEX", "TITLE_AND_ARTIST", "ALBUM", "DURATION"];
const allowedDropTypes = [];
export const fetchTopTracks = (timeRange) => spotifyApi.currentUser.topItems("tracks", timeRange, 50, 0);
const TracksPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-tracks");
    const timeRange = OptionToTimeRange[activeOption];
    const { status, error, data, refetch } = S.ReactQuery.useQuery({
        queryKey: ["topTracks", timeRange],
        queryFn: () => fetchTopTracks(timeRange),
    });
    const thisRef = React.useRef(null);
    const { usePlayContextItem } = S.getPlayContext({ uri: "" }, { featureIdentifier: "queue" });
    const Status = useStatus({ status, error, logger });
    if (Status) {
        return Status;
    }
    const topTracks = data.items;
    const pageContainerProps = {
        title: "Top Tracks",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), settingsButton],
        infoToCreatePlaylist: {
            playlistName: `Top Songs - ${activeOption}`,
            itemsUris: topTracks.map(track => track.uri),
        },
    };
    return (S.React.createElement(PageContainer, { ...pageContainerProps },
        S.React.createElement(S.ReactComponents.TracklistColumnsContextProvider, { columns: columns },
            S.React.createElement(S.ReactComponents.Tracklist, { ariaLabel: "Top Tracks", hasHeaderRow: true, columns: columns, renderRow: (track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.album.images.at(-1)?.url ?? DEFAULT_TRACK_IMG, isExplicit: track.explicit, albumOrShow: track.album, duration_ms: track.duration_ms, usePlayContextItem: usePlayContextItem, allowedDropTypes: allowedDropTypes })), resolveItem: track => ({ uri: track.uri }), nrTracks: topTracks.length, fetchTracks: (offset, limit) => topTracks.slice(offset, offset + limit), limit: 50, outerRef: thisRef, tracks: topTracks, isCompactMode: false, columnPersistenceKey: "stats-top-tracks" }, "spotify:app:stats:tracks"))));
};
export default React.memo(TracksPage);
