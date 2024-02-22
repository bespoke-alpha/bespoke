import { _ } from "/hooks/deps.js";
import { fetchPlaylistContents } from "../delulib/platformApi.js";

import { LikedPlaylist, PersonalFolder, PersonalPlaylist, PoF } from "./util.js";

import { S } from "../std/index.js";

const LibraryAPI = S.Platform.getLibraryAPI();
const LocalStorageAPI = S.Platform.getLocalStorageAPI();

export type LibraryBackup = {
	library: Record<string, Array<string>>;
	playlists: PersonalFolder;
};
export type LocalStorageBackup = {
	localStore: Array<[string, string]>;
	localStoreAPI: Array<[string, string]>;
};

export type SettingBackup = {
	settings: Array<[string, string, any]>;
};

export const getLibrary = async () => {
	const { items } = await LibraryAPI.getContents({ limit: 50000, sortOrder: 1 });
	const lib = {} as Record<string, Array<string>>;
	for (const item of items) {
		lib[item.type] ??= [];
		lib[item.type].push(item.uri);
	}
	return lib;
};

enum SettingType {
	CHECKBOX = "checkbox",
	TEXT = "text",
	SELECT = "select",
}

type Setting = [string, SettingType.CHECKBOX, boolean] | [string, SettingType.TEXT, string] | [string, SettingType.SELECT, string];
export const getSettings = () => {
	const SETTINGS_EL_SEL = `[id^="settings."],[id^="desktop."],[class^="network."]`;
	const settingsEls = Array.from(document.querySelectorAll(SETTINGS_EL_SEL) as NodeListOf<HTMLElement>);
	const settings = settingsEls.map(settingEl => {
		const id = settingEl.getAttribute("id");

		if (!id) return null;

		if (settingEl instanceof HTMLInputElement) {
			switch (settingEl.getAttribute("type")) {
				case "checkbox":
					return [id, SettingType.CHECKBOX, settingEl.checked] as const;
				case "text":
					return [id, SettingType.TEXT, settingEl.value] as const;
			}
		} else if (settingEl instanceof HTMLSelectElement) {
			return [id, SettingType.SELECT, settingEl.value] as const;
		}
		return null;
	});
	return _.compact(settings) as Setting[];
};

export const getLocalStorage = () => Object.entries(localStorage).filter(([key]) => key.startsWith("module:"));

export const getLocalStoreAPI = () => {
	return Object.entries(LocalStorageAPI.items)
		.filter(([key]) => key.startsWith(LocalStorageAPI.namespace))
		.map(([key, value]) => [key.split(":")[1], value] as const);
};

export const extractLikedPlaylistTreeRecur = async (leaf: PoF): Promise<PersonalFolder | PersonalPlaylist | LikedPlaylist> => {
	switch (leaf.type) {
		case "playlist": {
			const getPlaylistContents = (uri: string) => fetchPlaylistContents(uri).then(tracks => tracks.map(track => track.uri));

			return {
				[leaf.name]: leaf.isOwnedBySelf ? await getPlaylistContents(leaf.uri) : leaf.uri,
			} as PersonalPlaylist | LikedPlaylist;
		}
		case "folder": {
			const a = leaf.items.map(extractLikedPlaylistTreeRecur);
			return {
				[leaf.name]: await Promise.all(a),
			};
		}
	}
};
