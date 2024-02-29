import { S, SVGIcons, createStorage, createRegistrar, createLogger } from "/modules/Delusoire/std/index.js";
import { NavLink } from "/modules/Delusoire/std/registers/navlink.js";
import { ACTIVE_ICON, ICON } from "./static.js";
import PlaylistPage from "./pages/playlist.js";
import { STATS_VERSION } from "./static.js";
import { onHistoryChanged } from "/modules/Delusoire/delulib/listeners.js";
import { display } from "/modules/Delusoire/std/api/modal.js";
import { Button } from "../std/registers/topbarLeftButton.js";
const { React, URI } = S;
const History = S.Platform.getHistory();
export let storage = undefined;
export let logger = undefined;
export default function (mod) {
    storage = createStorage(mod);
    logger = createLogger(mod);
    const registrar = createRegistrar(mod);
    {
        const version = storage.getItem("version");
        if (!version || version !== STATS_VERSION) {
            for (const k of Object.keys(globalThis.localStorage)) {
                if (k.startsWith("stats:") && !k.startsWith("stats:config:")) {
                    globalThis.localStorage.removeItem(k);
                }
            }
            storage.setItem("version", STATS_VERSION);
        }
    }
    storage.setItem("cache-info", JSON.stringify([0, 0, 0, 0, 0, 0]));
    let setPlaylistEditHidden = undefined;
    const PlaylistEdit = () => {
        const [hidden, setHidden] = React.useState(true);
        setPlaylistEditHidden = setHidden;
        if (hidden)
            return;
        return (S.React.createElement(Button, { label: "playlist-stats", icon: SVGIcons.visualizer, onClick: () => {
                const playlistUri = URI.fromString(History.location.pathname).toURI();
                display({ title: "Playlist Stats", content: S.React.createElement(PlaylistPage, { uri: playlistUri }), isLarge: false });
            } }));
    };
    onHistoryChanged(() => true, uri => {
        const isPlaylistPage = URI.is.PlaylistV1OrV2(uri);
        setPlaylistEditHidden?.(!isPlaylistPage);
    }, true);
    registrar.register("topbarLeftButton", S.React.createElement(PlaylistEdit, null));
    const LazyStatsApp = S.React.lazy(() => import("./app.js"));
    registrar.register("route", S.React.createElement(S.ReactComponents.Route, { path: "/stats/*", element: S.React.createElement(LazyStatsApp, null) }));
    registrar.register("navlink", () => S.React.createElement(NavLink, { localizedApp: "Statistics", appRoutePath: "/stats", icon: ICON, activeIcon: ACTIVE_ICON }));
}
