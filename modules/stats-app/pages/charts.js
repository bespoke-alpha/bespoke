import { S } from "/modules/std/index.js";
const { React } = S;
import Status from "../shared/components/status.js";
import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import { apiRequest, checkLiked, convertArtistData, convertTrackData, updatePageCache } from "../funcs.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import Tracklist from "../components/tracklist.js";
import PageContainer from "../shared/components/page_container.js";
import { LASTFM } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
import { CONFIG } from "../settings.js";
const DropdownOptions = [
    { id: "artists", name: "Top Artists" },
    { id: "tracks", name: "Top Tracks" },
];
const ChartsPage = () => {
    const [chartData, setChartData] = React.useState(100);
    const [dropdown, activeOption, setActiveOption] = useDropdownMenu(DropdownOptions, "charts");
    async function fetchChartData(type, force, set = true) {
        if (!force) {
            const storedData = storage.getItem(`charts:${type}`);
            if (storedData)
                return setChartData(JSON.parse(storedData));
        }
        const api_key = CONFIG.LFMApiKey;
        if (!api_key)
            return setChartData(200);
        const response = await apiRequest("charts", LASTFM.charts(api_key, type));
        if (!response)
            return setChartData(500);
        const data = response[type].track || response[type].artist;
        const cardData = await (type === "artists" ? convertArtistData(data) : convertTrackData(data));
        if (type === "tracks") {
            const likedArray = await checkLiked(cardData.map(track => track.id));
            if (!likedArray)
                return setChartData(200);
            cardData.forEach((track, index) => {
                track.liked = likedArray[index];
            });
        }
        if (set)
            setChartData(cardData);
        storage.setItem(`charts:${type}`, JSON.stringify(cardData));
    }
    React.useEffect(() => {
        updatePageCache(4, fetchChartData, activeOption.id, "charts");
    }, []);
    React.useEffect(() => {
        fetchChartData(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchChartData(activeOption.id, true);
    };
    const props = {
        title: "Top Albums",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    switch (chartData) {
        case 200:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "No API Key", subheading: "Please enter your Last.fm API key in the settings menu." })));
        case 500:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "Error", subheading: "An error occurred while fetching the data." })));
        case 100:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "Fetching data from Last.fm..." })));
    }
    // @ts-ignore
    if (!chartData[0]?.album) {
        const artistCards = chartData.map((artist, index) => {
            const type = artist.uri.startsWith("https") ? "lastfm" : "artist";
            return S.React.createElement(SpotifyCard, { type: type, uri: artist.uri, header: artist.name, subheader: `#${index + 1} Artist`, imageUrl: artist.image });
        });
        props.title = "Charts - Top Artists";
        return (S.React.createElement(PageContainer, { ...props },
            S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, artistCards)));
    }
    const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    });
    const infoToCreatePlaylist = {
        playlistName: `Charts - Top Tracks - ${date}`,
        itemsUris: chartData.map(track => track.uri),
    };
    const trackRows = chartData.map((track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index + 1, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.image, isExplicit: track.explicit, albumOrShow: { type: "album", name: track.album, uri: track.album_uri }, isOwnedBySelf: track.liked, duration_ms: track.duration })));
    props.title = "Charts - Top Tracks";
    return (S.React.createElement(PageContainer, { ...props, infoToCreatePlaylist: infoToCreatePlaylist },
        S.React.createElement(Tracklist, null, trackRows)));
};
export default React.memo(ChartsPage);
