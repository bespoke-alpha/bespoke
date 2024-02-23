import { _ } from "/hooks/deps.js";
import { fetchPlaylistContents } from "../delulib/platformApi.js";
import { S } from "../std/index.js";
const LibraryAPI = S.Platform.getLibraryAPI();
const LocalStorageAPI = S.Platform.getLocalStorageAPI();
export const getLibrary = async () => {
    const { items } = await LibraryAPI.getContents({ limit: 50000, sortOrder: 1 });
    const lib = {};
    for (const item of items) {
        lib[item.type] ??= [];
        lib[item.type].push(item.uri);
    }
    return lib;
};
var SettingType;
(function (SettingType) {
    SettingType["CHECKBOX"] = "checkbox";
    SettingType["TEXT"] = "text";
    SettingType["SELECT"] = "select";
})(SettingType || (SettingType = {}));
export const getSettings = () => {
    const SETTINGS_EL_SEL = `[id^="settings."],[id^="desktop."],[class^="network."],[id^="global."]`;
    const settingsEls = Array.from(document.querySelectorAll(SETTINGS_EL_SEL));
    const settings = settingsEls.map(settingEl => {
        const id = settingEl.getAttribute("id");
        if (!id)
            return null;
        if (settingEl instanceof HTMLInputElement) {
            switch (settingEl.getAttribute("type")) {
                case "checkbox":
                    return [id, SettingType.CHECKBOX, settingEl.checked];
                case "text":
                    return [id, SettingType.TEXT, settingEl.value];
            }
        }
        else if (settingEl instanceof HTMLSelectElement) {
            return [id, SettingType.SELECT, settingEl.value];
        }
        return null;
    });
    return _.compact(settings);
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
