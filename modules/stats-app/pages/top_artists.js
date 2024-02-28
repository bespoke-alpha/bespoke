import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdown from "../shared/dropdown/useDropdownMenu.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import { apiRequest, convertArtistData, updatePageCache } from "../funcs.js";
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import { LASTFM, SPOTIFY } from "../endpoints.js";
import { PLACEHOLDER } from "../constants.js";
import SettingsButton from "../shared/components/settings_button.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import { storage } from "../index.js";
import { CONFIG } from "../settings.js";
export const topArtistsReq = async (time_range) => {
    if (CONFIG.UseLFM === true) {
        if (!CONFIG.LFMApiKey || !CONFIG.LFMUsername)
            return 300;
        const response = await apiRequest("lastfm", LASTFM.topartists(CONFIG.LFMUsername, CONFIG.LFMApiKey, time_range));
        if (!response)
            return 200;
        return await convertArtistData(response.topartists.artist);
    }
    const response = await apiRequest("topArtists", SPOTIFY.topartists(time_range));
    if (!response)
        return 200;
    return response.items.map((artist) => {
        const image = artist.images[2]?.url || artist.images[1]?.url || PLACEHOLDER;
        return {
            id: artist.id,
            name: artist.name,
            image,
            uri: artist.uri,
            genres: artist.genres,
        };
    });
};
const DropdownOptions = [
    { id: "short_term", name: "Past Month" },
    { id: "medium_term", name: "Past 6 Months" },
    { id: "long_term", name: "All Time" },
];
const ArtistsPage = () => {
    const [topArtists, setTopArtists] = React.useState(100);
    const [dropdown, activeOption, setActiveOption] = useDropdown(DropdownOptions, "top-artists");
    const fetchTopArtists = async (time_range, force, set = true) => {
        if (!force) {
            const storedData = storage.getItem(`top-artists:${time_range}`);
            if (storedData)
                return setTopArtists(JSON.parse(storedData));
        }
        const start = window.performance.now();
        const topArtists = await topArtistsReq(time_range);
        if (set)
            setTopArtists(topArtists);
        storage.setItem(`top-artists:${time_range}`, JSON.stringify(topArtists));
        console.log("total artists fetch time:", window.performance.now() - start);
    };
    React.useEffect(() => {
        updatePageCache(0, fetchTopArtists, activeOption.id);
    }, []);
    React.useEffect(() => {
        fetchTopArtists(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchTopArtists(activeOption.id, true);
    };
    const props = {
        title: "Top Artists",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    switch (topArtists) {
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
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, topArtists.map((artist, index) => (S.React.createElement(SpotifyCard, { type: artist.uri.includes("last") ? "lastfm" : "artist", uri: artist.uri, header: artist.name, subheader: `#${index + 1} Artist`, imageUrl: artist.image }))))));
};
export default React.memo(ArtistsPage);
