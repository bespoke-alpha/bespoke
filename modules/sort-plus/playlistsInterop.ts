import { _ } from "../std/deps.js";
import { progressify } from "../delulib/fp.js";
import {
	createPlaylistFromTracks,
	fetchFolder,
	fetchPlaylistContents,
	fetchRootFolder,
	movePlaylistTracks,
	setPlaylistVisibility,
} from "../delulib/platformApi.js";
import { SpotifyLoc } from "../delulib/util.js";

import { lastFetchedUri, lastSortAction } from "./index.js";
import { CONFIG } from "./settings.js";
import { ERROR, getNameFromUri } from "./util.js";

import { S } from "../std/index.js";

const { URI } = S;

export const createPlaylistFromLastSortedQueue = async () => {
	if (globalThis.lastSortedQueue.length === 0) {
		S.Snackbar.enqueueSnackbar(ERROR.LAST_SORTED_QUEUE_EMPTY, { variant: "error" });
		return;
	}

	const sortedPlaylistsFolder = await fetchFolder(CONFIG.sortedPlaylistsFolderUri).catch(fetchRootFolder);

	const uri = URI.fromString(lastFetchedUri);
	const playlistName = `${await getNameFromUri(uri)} - ${lastSortAction}`;

	const { success, uri: playlistUri } = await createPlaylistFromTracks(
		playlistName,
		globalThis.lastSortedQueue.map(t => t.uri),
		sortedPlaylistsFolder.uri,
	);

	if (!success) {
		S.Snackbar.enqueueSnackbar(`Failed to create Playlist ${playlistName}`, { variant: "error" });
		return;
	}

	setPlaylistVisibility(playlistUri, false);
	S.Snackbar.enqueueSnackbar(`Playlist ${playlistName} created`, { variant: "default" });
};

export const reordedPlaylistLikeSortedQueue = async () => {
	if (globalThis.lastSortedQueue.length === 0) {
		S.Snackbar.enqueueSnackbar(ERROR.LAST_SORTED_QUEUE_EMPTY, { variant: "error" });
		return;
	}

	if (!URI.is.PlaylistV1OrV2(lastFetchedUri)) {
		S.Snackbar.enqueueSnackbar(ERROR.LAST_SORTED_QUEUE_NOT_A_PLAYLIST, { variant: "error" });
		return;
	}

	const sortedUids = globalThis.lastSortedQueue.map(track => track.uid!);
	const playlistUids = (await fetchPlaylistContents(lastFetchedUri)).map(item => item.uid);

	let i = sortedUids.length - 1;
	const uidsByReqs = new Array<string[]>();
	while (i >= 0) {
		const uids = new Array<string>();

		_.forEachRight(playlistUids, (uid, j) => {
			if (uid === sortedUids[i]) {
				i--;
				playlistUids.splice(j, 1);
				uids.push(uid);
			}
		});

		uidsByReqs.push(uids.reverse());
	}

	const fn = progressify((uids: string[]) => movePlaylistTracks(lastFetchedUri, uids, SpotifyLoc.before.start()), uidsByReqs.length);

	await Promise.all(uidsByReqs.map(fn));

	S.Snackbar.enqueueSnackbar("Reordered the sorted playlist", { variant: "default" });
	if (playlistUids.length) {
		S.Snackbar.enqueueSnackbar(`Left ${playlistUids.length} unordered at the bottom`, { variant: "default" });
	}
};
