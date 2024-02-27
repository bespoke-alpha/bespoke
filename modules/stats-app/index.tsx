import { S, SVGIcons, extendLocalStorage, extendRegistrar } from "/modules/std/index.js";
import { NavLink } from "/modules/std/registers/navlink.js";
import { ACTIVE_ICON, ICON } from "./constants.js";
import { Module } from "/hooks/module.js";

import PlaylistPage from "./pages/playlist.js";
import { STATS_VERSION } from "./constants.js";
import { onHistoryChanged } from "/modules/delulib/listeners.js";
import { display } from "/modules/std/api/modal.js";
import { Button } from "../std/registers/topbarLeftButton.js";

const { React, URI } = S;

const History = S.Platform.getHistory();

export default function (_module: Module) {
	const module = extendLocalStorage(extendRegistrar(_module));
	const { registrar, localStorage } = module;

	{
		const version = localStorage.getItem("version");
		if (!version || version !== STATS_VERSION) {
			for (const k of Object.keys(globalThis.localStorage)) {
				if (k.startsWith("stats:") && !k.startsWith("stats:config:")) {
					globalThis.localStorage.removeItem(k);
				}
			}
			localStorage.setItem("version", STATS_VERSION);
		}
	}

	localStorage.setItem("cache-info", JSON.stringify([0, 0, 0, 0, 0, 0]));

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
					const playlistUri = URI.fromString(History.location.pathname);
					display({ title: "Playlist Stats", content: <PlaylistPage uri={playlistUri} />, isLarge: true });
				}}
			/>
		);
	};

	onHistoryChanged(
		() => true,
		pathname => {
			const [, type, uid] = pathname.split("/");
			const isPlaylistPage = type === "playlist" && uid;
			setPlaylistEditHidden?.(!isPlaylistPage);
		},
		false,
	);

	registrar.register("topbarLeftButton", <PlaylistEdit />);

	registrar.register("route", <S.ReactComponents.Route path={"/stats"} element={import("./app.js")} />);

	registrar.register("navlink", <NavLink localizedApp="Statistics" appRoutePath="/stats" icon={ICON} activeIcon={ACTIVE_ICON} />);
}
