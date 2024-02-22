import { fetchRootFolder } from "../delulib/platformApi.js";

import {
	LibraryBackup,
	LocalStorageBackup,
	SettingBackup,
	extractLikedPlaylistTreeRecur,
	getLibrary,
	getLocalStorage,
	getLocalStoreAPI,
	getSettings,
} from "./backup.js";
import { restoreLocalStorage, restoreLibrary, restoreSettings } from "./restore.js";

import { S } from "../std/index.js";

const ClipboardAPI = S.Platform.getClipboardAPI();

export const backup = async (silent = false) => {
	const library = await getLibrary();
	const playlists = await fetchRootFolder().then(extractLikedPlaylistTreeRecur);
	const localStore = getLocalStorage();
	const localStoreAPI = getLocalStoreAPI();
	const settings = getSettings();

	await ClipboardAPI.copy(
		JSON.stringify({
			library,
			playlists,
			localStore,
			localStoreAPI,
			settings,
		} as Vault),
	);

	!silent && S.Snackbar.enqueueSnackbar("Backed up Playlists, Extensions and Settings");
};

type Vault = LibraryBackup & LocalStorageBackup & SettingBackup;
export enum RestoreScope {
	LIBRARY = "library",
	LOCALSTORAGE = "localstorage",
	SETTINGS = "settings",
}

export const restoreFactory = (mode: RestoreScope) => async () => {
	const vault = JSON.parse(await ClipboardAPI.paste()) as Vault;

	switch (mode) {
		case RestoreScope.LIBRARY:
			return restoreLibrary(vault, true);
		case RestoreScope.LOCALSTORAGE:
			return restoreLocalStorage(vault, true);
		case RestoreScope.SETTINGS:
			return restoreSettings(vault, true);
	}
};

import("./settings.js");
