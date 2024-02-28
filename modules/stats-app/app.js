import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
import GenresPage from "./pages/top_genres.js";
import LibraryPage from "./pages/library.js";
import ChartsPage from "./pages/charts.js";
import AlbumsPage from "./pages/top_albums.js";
import { STATS_VERSION, LATEST_RELEASE } from "./constants.js";
import { S } from "/modules/std/index.js";
const { React } = S;
const checkForUpdates = () => fetch(LATEST_RELEASE)
    .then(res => res.json())
    .then(result => result[0].name.slice(1) !== STATS_VERSION)
    .catch(err => console.log("Failed to check for updates", err));
const pages = {
    artists: S.React.createElement(ArtistsPage, null),
    tracks: S.React.createElement(TracksPage, null),
    albums: S.React.createElement(AlbumsPage, null),
    genres: S.React.createElement(GenresPage, null),
    library: S.React.createElement(LibraryPage, null),
    charts: S.React.createElement(ChartsPage, null),
};
const Q = ({ to, title, selected, onClick }) => (S.React.createElement(S.ReactComponents.NavTo, { replace: true, to: to, tabIndex: -1, onClick: onClick, className: "ZWI7JsjzJaR_G8Hy4W6J" },
    S.React.createElement(S.ReactComponents.Chip, { selected: selected, selectedColorSet: "invertedLight", tabIndex: -1 }, title)));
const NavBar = ({ categories, selectedCategory }) => (S.React.createElement("div", { className: "fVB_YDdnaDlztX7CcWTA" },
    S.React.createElement("div", { className: "e179_Eg8r7Ub6yjjxctr contentSpacing" },
        S.React.createElement("div", { className: "VIeVCUUETJyYPCDpsBif" },
            S.React.createElement(S.ReactComponents.Scrollable, null, categories.map(category => (S.React.createElement(Q, { to: `spotify:app:stats:${category}`, title: category, selected: category === selectedCategory }, category))))))));
const categories = Object.keys(pages);
const Page = ({ selectedCategory }) => pages[selectedCategory];
export default function () {
    const [newUpdate, setNewUpdate] = React.useState(false);
    React.useEffect(() => {
        checkForUpdates().then(newUpdate => setNewUpdate(newUpdate ?? false));
    }, []);
    const match = S.useMatch("/stats/:category");
    const selectedCategory = match?.params?.category ?? categories[0];
    return (S.React.createElement("div", { id: "stats-app" },
        S.React.createElement(NavBar, { categories: categories, selectedCategory: selectedCategory }),
        newUpdate && (S.React.createElement("div", { className: "new-update" },
            "New app update available! Visit ",
            S.React.createElement("a", { href: "https://github.com/harbassan/spicetify-stats/releases" }, "harbassan/spicetify-stats"),
            " to install.")),
        S.React.createElement(S.ReactComponents.Routes, null,
            S.React.createElement(S.ReactComponents.Route, { path: "/", element: pages.library }),
            S.React.createElement(S.ReactComponents.Route, { path: ":category", element: S.React.createElement(Page, { selectedCategory: selectedCategory }) }))));
}
