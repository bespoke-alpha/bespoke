import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
import GenresPage from "./pages/top_genres.js";
import LibraryPage from "./pages/library.js";
import AlbumsPage from "./pages/top_albums.js";
import { S } from "/modules/Delusoire/std/index.js";
const { ReactDOM } = S;
const Pages = {
    tracks: S.React.createElement(TracksPage, null),
    artists: S.React.createElement(ArtistsPage, null),
    albums: S.React.createElement(AlbumsPage, null),
    genres: S.React.createElement(GenresPage, null),
    library: S.React.createElement(LibraryPage, null),
};
const NavToChip = ({ to, title, selected, onClick }) => (S.React.createElement(S.ReactComponents.NavTo, { replace: true, to: to, tabIndex: -1, onClick: onClick, className: "ZWI7JsjzJaR_G8Hy4W6J" },
    S.React.createElement(S.ReactComponents.Chip, { selected: selected, selectedColorSet: "invertedLight", tabIndex: -1 }, title)));
const NavBar = ({ categories, selectedCategory }) => (S.React.createElement("div", { className: "fVB_YDdnaDlztX7CcWTA" },
    S.React.createElement("div", { className: "e179_Eg8r7Ub6yjjxctr contentSpacing" },
        S.React.createElement("div", { className: "VIeVCUUETJyYPCDpsBif" },
            S.React.createElement(S.ReactComponents.Scrollable, null, categories.map(category => (S.React.createElement(NavToChip, { to: `spotify:app:stats:${category}`, title: category, selected: category === selectedCategory }, category))))))));
const TopbarMounted = ({ children }) => {
    return ReactDOM.createPortal(S.React.createElement("div", { className: "main-topbar-topbarContent", style: { pointerEvents: "all" } }, children), document.querySelector(".main-topBar-topbarContentWrapper"));
};
const categories = Object.keys(Pages);
const Page = ({ selectedCategory }) => Pages[selectedCategory];
export default function () {
    const match = S.useMatch("/stats/:category");
    const selectedCategory = match?.params?.category ?? categories[0];
    return (S.React.createElement("div", { id: "stats-app" },
        S.React.createElement(TopbarMounted, null,
            S.React.createElement(NavBar, { categories: categories, selectedCategory: selectedCategory })),
        S.React.createElement(S.ReactComponents.Routes, null,
            S.React.createElement(S.ReactComponents.Route, { path: "/", element: Pages[categories[0]] }),
            S.React.createElement(S.ReactComponents.Route, { path: ":category", element: S.React.createElement(Page, { selectedCategory: selectedCategory }) }))));
}
