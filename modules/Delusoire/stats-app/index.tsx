import { S, SVGIcons, createStorage, createRegistrar, createLogger } from "/modules/Delusoire/std/index.js";
import { NavLink } from "/modules/Delusoire/std/registers/navlink.js";
import { ACTIVE_ICON, ICON } from "./static.js";
import { Module } from "/hooks/module.js";

import PlaylistPage from "./pages/playlist.js";
import { onHistoryChanged } from "/modules/Delusoire/delulib/listeners.js";
import { display } from "/modules/Delusoire/std/api/modal.js";
import { Button } from "/modules/Delusoire/std/registers/topbarLeftButton.js";
import { createSettingsSection, type Settings } from "/modules/Delusoire/std/api/settings.js";

const { React, URI } = S;

const History = S.Platform.getHistory();

export let storage: Storage = undefined;
export let logger: Console = undefined;
export let settings: Settings = undefined;

export default function (mod: Module) {
	storage = createStorage(mod);
	logger = createLogger(mod);
	settings = createSettingsSection(mod);
	const registrar = createRegistrar(mod);

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
