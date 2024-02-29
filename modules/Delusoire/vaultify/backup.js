import { _ } from "/modules/Delusoire/std/deps.js";
import { fetchPlaylistContents, fetchRootFolder } from "/modules/Delusoire/delulib/platformApi.js";
import { S } from "/modules/Delusoire/std/index.js";
const LibraryAPI = S.Platform.getLibraryAPI();
const LocalStorageAPI = S.Platform.getLocalStorageAPI();
export const getLibrary = async () => {
    const { items } = await LibraryAPI.getContents({ limit: 50000, sortOrder: 1 });
    const lib = {};
    for (const item of items) {
        lib[item.type] ??= [];
        lib[item.type].push(item.uri);
    }
    const extractUris = ({ items }) => items.map(item => item.uri);
    const track = await LibraryAPI.getTracks({ limit: 50000, sort: { field: "ADDED_AT", order: "ASC" } }).then(extractUris);
    const episode = await LibraryAPI.getEpisodes({ limit: 50000, sort: { field: "ADDED_AT", order: "ASC" } }).then(extractUris);
    // const book =
    const rootlist = await fetchRootFolder().then(extractLikedPlaylistTreeRecur);
    return Object.assign({
        track,
        episode,
        rootlist,
    }, _.omit(lib, ["playlist", "folder"]));
};
const Prefs = S.Platform.getPlayerAPI()._prefs;
const ProductState = S.Platform.getUserAPI()._product_state_service;
BigInt.prototype.toJSON = function () {
    return `${this.toString()}n`;
};
export const getSettings = async () => {
    const { entries } = await Prefs.getAll();
    const { pairs } = await ProductState.getValues();
    const prefs = entries;
    const productState = _.pick(pairs, [
        "filter-explicit-content",
        "publish-playlist",
        "publish-activity",
        "public-toplist",
        "autoplay",
        "dsa-mode-enabled",
        "dsa-mode-available",
    ]);
    return {
        prefs,
        productState,
    };
};
export const getLocalStorage = () => Object.entries(localStorage).filter(([key]) => key.startsWith("module:"));
export const getLocalStoreAPI = () => {
    return Object.entries(LocalStorageAPI.items)
        .filter(([key]) => key.startsWith(LocalStorageAPI.namespace))
        .map(([key, value]) => [key.split(":")[1], value]);
};
export const extractLikedPlaylistTreeRecur = async (leaf) => {
    switch (leaf.type) {
        case "playlist": {
            const getPlaylistContents = (uri) => fetchPlaylistContents(uri).then(tracks => tracks.map(track => track.uri));
            return {
                [leaf.name]: leaf.isOwnedBySelf ? await getPlaylistContents(leaf.uri) : leaf.uri,
            };
        }
        case "folder": {
            const a = leaf.items.map(extractLikedPlaylistTreeRecur);
            return {
                [leaf.name]: await Promise.all(a),
            };
        }
    }
};
