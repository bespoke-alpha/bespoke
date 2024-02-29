import {
	addPlaylistTracks,
	createPlaylist,
	removePlaylistTracks,
	setPlaylistVisibility,
	setInLibrary,
} from "/modules/Delusoire/delulib/platformApi.js";
import { SpotifyLoc } from "/modules/Delusoire/delulib/util.js";

import { updateCollectionControls, updateNowPlayingControls, updateTrackListControls } from "./controls.js";
import { CONFIG } from "./settings.js";
import { getNowPlayingBar } from "./util.js";
import { _ } from "/modules/Delusoire/std/deps.js";
import { S } from "/modules/Delusoire/std/index.js";

const { URI } = S;
const History = S.Platform.getHistory();
const PlayerAPI = S.Platform.getPlayerAPI();

export const toggleRating = async (uri: string, rating: number) => {
	const currentRating = globalThis.tracksRatings[uri];

	if (currentRating === rating) rating = 0;

	if (currentRating) {
		const playlistIds = _.compact(playlistUris.slice(0, currentRating + 1)).map<string>(playlistUri => URI.fromString(playlistUri).id);

		for (const playlistId of playlistIds) {
			removePlaylistTracks(playlistId, [{ uri, uid: "" } as { uid: string }]);
		}
	}

	globalThis.tracksRatings[uri] = rating;

	if (rating > 0) {
		let playlistUri = playlistUris[rating] as string | undefined | null;

		if (!playlistUri) {
			playlistUri = (await createPlaylist(rating.toFixed(0), SpotifyLoc.after.fromUri(CONFIG.ratingsFolderUri))) as string;
			setPlaylistVisibility(playlistUri, false);
			playlistUris[rating] = playlistUri;
		}

		addPlaylistTracks(playlistUri, [uri]);

		if (rating >= Number(CONFIG.heartThreshold)) {
			setInLibrary([uri], true);
		}
	}

	const npTrack = PlayerAPI.getState().item?.uri;
	if (npTrack === uri) {
		updateNowPlayingControls(npTrack, false);

		//TODO: clean this
		{
			new MutationObserver((_, observer) => {
				observer.disconnect();
				if (npTrack !== uri) return;
				updateNowPlayingControls(npTrack, false);
			}).observe(getNowPlayingBar(), {
				subtree: true,
			});
		}
	}

	//TODO: Optimize this, find a way to directly target the pbs for that uri
	updateTrackListControls();
	const { pathname } = History.location;
	updateCollectionControls(URI.fromString(pathname).toString());
};
