import { addPlaylist, createFolder, createPlaylistFromTracks } from "../delulib/platformApi.js";
import { SpotifyLoc } from "../delulib/util.js";

import { LibraryBackup, LocalStorageBackup, SettingBackup } from "./backup.js";
import { LikedPlaylist, PersonalFolder, PersonalPlaylist, isContentOfPersonalPlaylist } from "./util.js";

import { S } from "../std/index.js";
import { _ } from "/hooks/deps.js";

const LocalStorageAPI = S.Platform.getLocalStorageAPI();

export const restoreLibrary = async (data: LibraryBackup, silent = true) => {
	await Promise.all(Object.values(data.library).map(uris => S.Platform.getLibraryAPI().add(...uris)));
	await restoreRootlistRecur(data.playlists);
	!silent && S.Snackbar.enqueueSnackbar("Restored Library");
};

export const restoreLocalStorage = (vault: LocalStorageBackup, silent = true) => {
	for (const [k, v] of vault.localStore) localStorage.setItem(k, v);
	for (const [k, v] of vault.localStoreAPI) LocalStorageAPI.setItem(k, v);
	!silent && S.Snackbar.enqueueSnackbar("Restored LocalStorage");
};

const Prefs = S.Platform.getPlayerAPI()._prefs;
const ProductState = S.Platform.getUserAPI()._product_state_service;

export const restoreSettings = async (data: SettingBackup, silent = true) => {
	const entries = _.mapValues(data.prefs, value => {
		value.number = eval(value.number);
		return value;
	});
	const pairs = data.productState;
	await Prefs.set({ entries });
	await ProductState.putValues({ pairs });
	!silent && S.Snackbar.enqueueSnackbar("Restored Settings");
};

const restoreRootlistRecur = async (leaf: PersonalFolder | PersonalPlaylist | LikedPlaylist, folder = "") =>
	await Promise.all(
		Object.keys(leaf).map(async name => {
			const subleaf = leaf[name];

			// isPlaylist
			if (!Array.isArray(subleaf)) return void addPlaylist(subleaf, folder);
			if (subleaf.length === 0) return;

			//isCollectionOfTracks
			if (isContentOfPersonalPlaylist(subleaf)) return void createPlaylistFromTracks(name, subleaf, folder);

			//isFolder
			const { success, uri } = await createFolder(name, SpotifyLoc.after.fromUri(folder));
			if (!success) return;

			for (const leaf of subleaf) restoreRootlistRecur(leaf, uri);
		}),
	);
