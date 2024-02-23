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

type Prefs = Record<
	string,
	{
		number?: number;
		bool?: boolean;
		string?: string;
	}
>;
type ProductState = Record<string, string>;

export type SettingBackup = {
	prefs: Prefs;
	productState: ProductState;
};

export const getLibrary = async () => {
	const { items } = await LibraryAPI.getContents({ limit: 50000, sortOrder: 1 });
	const lib = {} as Record<string, Array<string>>;
	for (const item of items) {
		lib[item.type] ??= [];
		lib[item.type].push(item.uri);
	}
	return _.omit(lib, ["playlist", "folder"]);
};

const Prefs = S.Platform.getPlayerAPI()._prefs;
const ProductState = S.Platform.getUserAPI()._product_state_service;

BigInt.prototype.toJSON = function () {
	return `${this.toString()}n`;
};

export const getSettings = async () => {
	const { entries } = await Prefs.getAll();
	const { pairs } = await ProductState.getValues();
	const prefs = entries as Prefs;
	const productState = _.pick(pairs, [
		"filter-explicit-content",
		"publish-playlist",
		"publish-activity",
		"public-toplist",
		"autoplay",
		"dsa-mode-enabled",
		"dsa-mode-available",
	]) as ProductState;

	return {
		prefs,
		productState,
	} as SettingBackup;
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
