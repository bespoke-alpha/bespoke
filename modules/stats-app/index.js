import { S, SVGIcons, createStorage, createRegistrar, createLogger } from "/modules/std/index.js";
import { NavLink } from "/modules/std/registers/navlink.js";
import { ACTIVE_ICON, ICON } from "./constants.js";
import PlaylistPage from "./pages/playlist.js";
import { STATS_VERSION } from "./constants.js";
import { onHistoryChanged } from "/modules/delulib/listeners.js";
import { display } from "/modules/std/api/modal.js";
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
                const playlistUri = URI.fromString(History.location.pathname);
                display({ title: "Playlist Stats", content: S.React.createElement(PlaylistPage, { uri: playlistUri }), isLarge: true });
            } }));
    };
    onHistoryChanged(() => true, pathname => {
        const [, type, uid] = pathname.split("/");
        const isPlaylistPage = type === "playlist" && uid;
        setPlaylistEditHidden?.(!isPlaylistPage);
    }, false);
    registrar.register("topbarLeftButton", S.React.createElement(PlaylistEdit, null));
    registrar.register("route", S.React.createElement(S.ReactComponents.Route, { path: "/stats", element: import("./app.js") }));
    registrar.register("navlink", S.React.createElement(NavLink, { localizedApp: "Statistics", appRoutePath: "/stats", icon: ICON, activeIcon: ACTIVE_ICON }));
}
