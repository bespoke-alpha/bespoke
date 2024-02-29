import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import useDropdown from "../components/shared/dropdown/useDropdownMenu.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import PageContainer from "../components/shared/page_container.js";
import RefreshButton from "../components/shared/buttons/refresh_button.js";
import SettingsButton from "../components/shared/settings_button.js";
import { CONFIG } from "../settings.js";
import { fetchLFMTopAlbums } from "../api/lastfm.js";
import { spotifyApi } from "../../delulib/api.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import { SpotifyTimeRange } from "../api/spotify.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": SpotifyTimeRange.Short,
    "Past 6 Months": SpotifyTimeRange.Medium,
    "All Time": SpotifyTimeRange.Long,
};
const AlbumsPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-artists");
    const timeRange = OptionToTimeRange[activeOption];
    const { isLoading, error, data: topAlbums, refetch, } = S.ReactQuery.useQuery({
        queryKey: ["topAlbums", CONFIG.LFMUsername, timeRange],
        queryFn: async () => {
            const { topalbums } = await fetchLFMTopAlbums(CONFIG.LFMApiKey)(CONFIG.LFMUsername, timeRange);
            return await Promise.all(topalbums.album.map(async (album) => {
                const matchingSpotifyAlbums = await spotifyApi.search(`${album.name}+artist:${encodeURIComponent(album.artist.name)}`, ["album"]);
                return matchingSpotifyAlbums.albums.items[0];
            }));
        },
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
        return (S.React.createElement(SpotifyCard, { type: type, uri: album.uri, header: album.name, subheader: `#${index + 1} Album`, imageUrl: album.images[0]?.url ?? DEFAULT_TRACK_IMG }));
    });
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, albumCards)));
};
export default React.memo(AlbumsPage);
