import { S } from "/modules/std/index.js";
const { React } = S;
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import Tracklist from "../components/tracklist.js";
import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import { apiRequest, updatePageCache, checkLiked, convertTrackData } from "../funcs.js";
import { LASTFM, SPOTIFY, PLACEHOLDER } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
export const topTracksReq = async (time_range, configWrapper) => {
    const { config } = configWrapper;
    if (config["use-lastfm"] === true) {
        if (!config["api-key"] || !config["lastfm-user"])
            return 300;
        const { "lastfm-user": user, "api-key": key } = config;
        const lastfmData = await apiRequest("lastfm", LASTFM.toptracks(user, key, time_range));
        if (!lastfmData)
            return 200;
        const spotifyData = await convertTrackData(lastfmData.toptracks.track);
        const likedArray = await checkLiked(spotifyData.map(track => track.id));
        if (!likedArray)
            return 200;
        spotifyData.forEach((track, index) => {
            track.liked = likedArray[index];
        });
        return spotifyData;
    }
    const response = await apiRequest("topTracks", SPOTIFY.toptracks(time_range));
    if (!response)
        return 200;
    const likedArray = await checkLiked(response.items.map((track) => track.id));
    if (!likedArray)
        return 200;
    return response.items.map((track, index) => {
        const images = track.album.images;
        const image = images[2]?.url || images[1]?.url || PLACEHOLDER;
        return {
            liked: likedArray[index],
            name: track.name,
            image,
            uri: track.uri,
            id: track.id,
            artists: track.artists.map((artist) => ({
                name: artist.name,
                uri: artist.uri,
            })),
            duration: track.duration_ms,
            album: track.album.name,
            album_uri: track.album.uri,
            popularity: track.popularity,
            explicit: track.explicit,
            release_year: track.album.release_date.slice(0, 4),
        };
    });
};
const DropdownOptions = [
    { id: "short_term", name: "Past Month" },
    { id: "medium_term", name: "Past 6 Months" },
    { id: "long_term", name: "All Time" },
];
const TracksPage = ({ configWrapper }) => {
    const [topTracks, setTopTracks] = React.useState(100);
    const [dropdown, activeOption] = useDropdownMenu(DropdownOptions, "stats:top-tracks");
    const fetchTopTracks = async (time_range, force, set = true) => {
        if (!force) {
            const storedData = storage.getItem(`top-tracks:${time_range}`);
            if (storedData)
                return setTopTracks(JSON.parse(storedData));
        }
        const start = window.performance.now();
        const topTracks = await topTracksReq(time_range, configWrapper);
        if (set)
            setTopTracks(topTracks);
        storage.setItem(`top-tracks:${time_range}`, JSON.stringify(topTracks));
        console.log("total tracks fetch time:", window.performance.now() - start);
    };
    React.useEffect(() => {
        updatePageCache(1, fetchTopTracks, activeOption.id);
    }, []);
    React.useEffect(() => {
        fetchTopTracks(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchTopTracks(activeOption.id, true);
    };
    const props = {
        title: "Top Tracks",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    switch (topTracks) {
        case 300:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "No API Key or Username", subheading: "Please enter these in the settings menu" })));
        case 200:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "Failed to Fetch Top Tracks", subheading: "An error occurred while fetching the data" })));
        case 100:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "Fetching data..." })));
    }
    const infoToCreatePlaylist = {
        playlistName: `Top Songs - ${activeOption}`,
        itemsUris: topTracks.map(track => track.uri),
    };
    const trackRows = topTracks.map((track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index + 1, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.image, isExplicit: track.explicit, albumOrShow: { type: "album", name: track.album, uri: track.album_uri }, isOwnedBySelf: track.liked, duration_ms: track.duration })));
    return (S.React.createElement(PageContainer, { ...props, infoToCreatePlaylist: infoToCreatePlaylist },
        S.React.createElement(Tracklist, null, trackRows)));
};
export default React.memo(TracksPage);
