import { updateCollectionControls, updateNowPlayingControls, updateTrackControls } from "./controls.js";
import { loadRatings } from "./util.js";
import { CONFIG } from "./settings.js";

import { _ } from "/modules/Delusoire/std/deps.js";
import { onHistoryChanged, onTrackListMutationListeners } from "/modules/Delusoire/delulib/listeners.js";
import { Events, SVGIcons, createRegistrar } from "/modules/Delusoire/std/index.js";
import { S } from "/modules/Delusoire/std/index.js";
import { useMenuItem } from "/modules/Delusoire/std/registers/menu.js";
import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";
import type { Module } from "/hooks/module.js";
const { URI } = S;

declare global {
	// biome-ignore lint/style/noVar: global scope
	var tracksRatings: Record<string, number>;
	// biome-ignore lint/style/noVar: global scope
	var playlistUris: string[];
}

globalThis.tracksRatings || (globalThis.tracksRatings = {});
globalThis.playlistUris || (globalThis.playlistUris = []);

const PlayerAPI = S.Platform.getPlayerAPI();

loadRatings();

Events.Player.songchanged.on(state => {
	if (!state) return;
	const { uri } = state.item ?? {};
	if (!uri) return;

	if (Number(CONFIG.skipThreshold)) {
		const currentTrackRating = tracksRatings[uri] ?? Number.MAX_SAFE_INTEGER;
		if (currentTrackRating <= Number(CONFIG.skipThreshold)) return void PlayerAPI.skipToNext();
	}

	updateNowPlayingControls(uri);
});

onTrackListMutationListeners.push(async (_, tracks) => {
	for (const track of tracks) updateTrackControls(track, track.props.uri);
});

onHistoryChanged(_.overSome([URI.is.Album, URI.is.Artist, URI.is.PlaylistV1OrV2]), uri => updateCollectionControls(uri));

export default function (mod: Module) {
	const registrar = createRegistrar(mod);

	registrar.register(
		"menu",
		S.React.createElement(() => {
			const { props } = useMenuItem();
			const { uri } = props.reference;
			return (
				<S.ReactComponents.MenuItem
					disabled={false}
					onClick={() => {
						CONFIG.ratingsFolderUri = uri;
					}}
					leadingIcon={createIconComponent({
						icon: SVGIcons["playlist-folder"],
					})}
				>
					Choose for Ratings Playlists
				</S.ReactComponents.MenuItem>
			);
		}),
		({ props }) => {
			return URI.is.Folder(props?.reference?.uri);
		},
	);
}
