import { type NamespacedStorage, S, SVGIcons, createStorage, createRegistrar, NamespacedLogger, createLogger } from "/modules/Delusoire/std/index.js";
import { NavLink } from "/modules/Delusoire/std/registers/navlink.js";
import { ACTIVE_ICON, ICON } from "./static.js";
import { Module } from "/hooks/module.js";

import PlaylistPage from "./pages/playlist.js";
import { STATS_VERSION } from "./static.js";
import { onHistoryChanged } from "/modules/Delusoire/delulib/listeners.js";
import { display } from "/modules/Delusoire/std/api/modal.js";
import { Button } from "../std/registers/topbarLeftButton.js";

const { React, URI } = S;

const History = S.Platform.getHistory();

export let storage: NamespacedStorage = undefined;
export let logger: NamespacedLogger = undefined;

export default function (mod: Module) {
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

	let setPlaylistEditHidden: React.Dispatch<React.SetStateAction<boolean>> | undefined = undefined;

	const PlaylistEdit = () => {
		const [hidden, setHidden] = React.useState(true);
		setPlaylistEditHidden = setHidden;
		if (hidden) return;

		return (
			<Button
				label="playlist-stats"
				icon={SVGIcons.visualizer}
				onClick={() => {
					const playlistUri = URI.fromString(History.location.pathname).toURI();
					display({ title: "Playlist Stats", content: <PlaylistPage uri={playlistUri} />, isLarge: false });
				}}
			/>
		);
	};

	onHistoryChanged(
		() => true,
		uri => {
			const isPlaylistPage = URI.is.PlaylistV1OrV2(uri);
			setPlaylistEditHidden?.(!isPlaylistPage);
		},
		true,
	);

	registrar.register("topbarLeftButton", <PlaylistEdit />);

	const LazyStatsApp = S.React.lazy(() => import("./app.js"));
	registrar.register("route", <S.ReactComponents.Route path={"/stats/*"} element={<LazyStatsApp />} />);

	registrar.register("navlink", () => <NavLink localizedApp="Statistics" appRoutePath="/stats" icon={ICON} activeIcon={ACTIVE_ICON} />);
}
