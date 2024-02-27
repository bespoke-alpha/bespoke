import { LibraryBackup, LocalStorageBackup, SettingBackup, getLibrary, getLocalStorage, getLocalStoreAPI, getSettings } from "./backup.js";
import { restoreLocalStorage, restoreLibrary, restoreSettings } from "./restore.js";

import { S } from "/modules/std/index.js";

const ClipboardAPI = S.Platform.getClipboardAPI();

export const backup = async (silent = false) => {
	const library = await getLibrary();
	const settings = await getSettings();
	const localStore = getLocalStorage();
	const localStoreAPI = getLocalStoreAPI();

	await ClipboardAPI.copy(
		JSON.stringify({
			library,
			settings,
			localStore,
			localStoreAPI,
		} as Vault),
	);

	!silent && S.Snackbar.enqueueSnackbar("Backed up Playlists, Extensions and Settings");
};

type Vault = { library: LibraryBackup; settings: SettingBackup } & LocalStorageBackup;
export enum RestoreScope {
	LIBRARY = "library",
	LOCALSTORAGE = "localstorage",
	SETTINGS = "settings",
}

export const restoreFactory = (mode: RestoreScope) => async () => {
	const vault = JSON.parse(await ClipboardAPI.paste()) as Vault;

	switch (mode) {
		case RestoreScope.LIBRARY:
			return restoreLibrary(vault.library, true);
		case RestoreScope.SETTINGS:
			return restoreSettings(vault.settings, true);
		case RestoreScope.LOCALSTORAGE:
			return restoreLocalStorage(vault, true);
	}
};

import("./settings.js");
