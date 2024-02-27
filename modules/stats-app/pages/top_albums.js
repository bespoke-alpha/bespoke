import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import { apiRequest, convertAlbumData, updatePageCache } from "../funcs.js";
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import { LASTFM } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
export const topAlbumsReq = async (time_range, configWrapper) => {
    const { config } = configWrapper;
    if (!config["api-key"] || !config["lastfm-user"])
        return 300;
    const { "lastfm-user": user, "api-key": key } = config;
    const response = await apiRequest("lastfm", LASTFM.topalbums(user, key, time_range));
    if (!response)
        return 200;
    return await convertAlbumData(response.topalbums.album);
};
const DropdownOptions = [
    { id: "short_term", name: "Past Month" },
    { id: "medium_term", name: "Past 6 Months" },
    { id: "long_term", name: "All Time" },
];
const AlbumsPage = ({ configWrapper }) => {
    const [topAlbums, setTopAlbums] = React.useState(100);
    const [dropdown, activeOption] = useDropdownMenu(DropdownOptions, "stats:top-albums");
    const fetchTopAlbums = async (time_range, force, set = true) => {
        if (!force) {
            const storedData = storage.getItem(`top-albums:${time_range}`);
            if (storedData)
                return setTopAlbums(JSON.parse(storedData));
        }
        const start = window.performance.now();
        const topAlbums = await topAlbumsReq(time_range, configWrapper);
        if (set)
            setTopAlbums(topAlbums);
        storage.setItem(`top-albums:${time_range}`, JSON.stringify(topAlbums));
        console.log("total albums fetch time:", window.performance.now() - start);
    };
    React.useEffect(() => {
        updatePageCache(5, fetchTopAlbums, activeOption.id);
    }, []);
    React.useEffect(() => {
        fetchTopAlbums(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchTopAlbums(activeOption.id, true);
    };
    const props = {
        title: "Top Albums",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    switch (topAlbums) {
        case 300:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "No API Key or Username", subheading: "Please enter these in the settings menu" })));
        case 200:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "Failed to Fetch Top Artists", subheading: "An error occurred while fetching the data" })));
        case 100:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "Fetching data..." })));
    }
    const albumCards = topAlbums.map((album, index) => {
        const type = album.uri.startsWith("https") ? "lastfm" : "album";
        return S.React.createElement(SpotifyCard, { type: type, uri: album.uri, header: album.name, subheader: `#${index + 1} Album`, imageUrl: album.image });
    });
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, albumCards)));
};
export default React.memo(AlbumsPage);
