import { updateCollectionControls, updateNowPlayingControls, updateTrackControls } from "./controls.js";
import { loadRatings } from "./util.js";
import { CONFIG } from "./settings.js";
import { _ } from "/modules/std/deps.js";
import { onHistoryChanged, onTrackListMutationListeners } from "/modules/delulib/listeners.js";
import { Events, SVGIcons, extendRegistrar } from "/modules/std/index.js";
import { S } from "/modules/std/index.js";
import { useMenuItem } from "/modules/std/registers/menu.js";
import { createIconComponent } from "/modules/std/api/createIconComponent.js";
const { URI } = S;
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
export default function (_module) {
	const module = extendRegistrar(_module);
	const { registrar } = module;
	registrar.register(
		"menu",
		S.React.createElement(() => {
			const { props } = useMenuItem();
			const { uri } = props.reference;
			return S.React.createElement(
				S.ReactComponents.MenuItem,
				{
					disabled: false,
					onClick: () => {
						CONFIG.ratingsFolderUri = uri;
					},
					leadingIcon: createIconComponent({
						icon: SVGIcons["playlist-folder"],
					}),
				},
				"Choose for Ratings Playlists",
			);
		}),
		({ props }) => {
			return URI.is.Folder(props?.reference?.uri);
		},
	);
}
