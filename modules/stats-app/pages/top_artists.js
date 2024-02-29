import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdown from "../shared/components/dropdown/useDropdownMenu.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import PageContainer from "../shared/components/page_container.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import SettingsButton from "../shared/components/settings_button.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import { spotifyApi } from "../../delulib/api.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": "short_term",
    "Past 6 Months": "medium_term",
    "All Time": "long_term",
};
const ArtistsPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-artists");
    const timeRange = OptionToTimeRange[activeOption];
    const { isLoading, error, data, refetch } = S.ReactQuery.useQuery({
        queryKey: ["topArtists", activeOption],
        queryFn: () => spotifyApi.currentUser.topItems("artists", timeRange, 50, 0),
    });
    if (isLoading) {
        return "Loading";
    }
    if (error) {
        return "Error";
    }
    const topArtists = data.items;
    const PageContainerProps = {
        title: "Top Artists",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    return (S.React.createElement(PageContainer, { ...PageContainerProps },
        S.React.createElement("div", { className: "iKwGKEfAfW7Rkx2_Ba4E grid" }, topArtists.map((artist, index) => (S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `#${index + 1} Artist`, imageUrl: artist.images.at(-1).url ?? DEFAULT_TRACK_IMG }))))));
};
export default React.memo(ArtistsPage);
