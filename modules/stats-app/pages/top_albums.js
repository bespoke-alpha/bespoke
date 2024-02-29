import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdown from "../shared/components/dropdown/useDropdownMenu.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import PageContainer from "../shared/components/page_container.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { CONFIG } from "../settings.js";
import { fetchLFMTopAlbums } from "../api/lastfm.js";
import { spotifyApi } from "../../delulib/api.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": "short_term",
    "Past 6 Months": "medium_term",
    "All Time": "long_term",
};
const AlbumsPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-artists");
    const timeRange = OptionToTimeRange[activeOption];
    const { isLoading, error, data: topAlbums, refetch, } = S.ReactQuery.useQuery({
        queryKey: ["topAlbums", activeOption],
        queryFn: () => fetchLFMTopAlbums(CONFIG.LFMApiKey)(CONFIG.LFMUsername, timeRange).then(async (data) => await Promise.all(data.topalbums.album.map(async (album) => {
            const matchingSpotifyAlbums = await spotifyApi.search(`${album.name}+artist:${encodeURIComponent(album.artist.name)}`, ["album"]);
            return matchingSpotifyAlbums.albums.items[0];
        }))),
    });
    if (isLoading) {
        return "Loading";
    }
    if (error) {
        return "Error";
    }
    const props = {
        title: "Top Albums",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    const albumCards = topAlbums.map((album, index) => {
        const type = album.uri.startsWith("https") ? "lastfm" : "album";
        return (S.React.createElement(SpotifyCard, { type: type, uri: album.uri, header: album.name, subheader: `#${index + 1} Album`, imageUrl: album.images[0].url ?? DEFAULT_TRACK_IMG }));
    });
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, albumCards)));
};
export default React.memo(AlbumsPage);
