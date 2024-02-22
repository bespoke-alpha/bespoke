import { addPlaylist, createFolder, createPlaylistFromTracks } from "../delulib/platformApi.js";
import { REACT_PROPS, SpotifyLoc } from "../delulib/util.js";
import { isContentOfPersonalPlaylist } from "./util.js";
import { S } from "../std/index.js";
const LocalStorageAPI = S.Platform.getLocalStorageAPI();
export const restoreLibrary = async (data, silent = true) => {
    await Promise.all(Object.values(data.library).map(uris => S.Platform.getLibraryAPI().add(...uris)));
    await restoreRootlistRecur(data.playlists);
    !silent && S.Snackbar.enqueueSnackbar("Restored Library");
};
export const restoreLocalStorage = (vault, silent = true) => {
    for (const [k, v] of vault.localStore)
        localStorage.setItem(k, v);
    for (const [k, v] of vault.localStoreAPI)
        LocalStorageAPI.setItem(k, v);
    !silent && S.Snackbar.enqueueSnackbar("Restored LocalStorage");
};
export const restoreSettings = (data, silent = true) => {
    data.settings.map(([id, type, value]) => {
        const setting = document.querySelector(`[id="${id}"]`);
        if (!setting)
            return console.warn(`Setting for ${id} wasn't found`);
        if (type === "text")
            setting.value = value;
        else if (type === "checkbox")
            setting.checked = value;
        else if (type === "select")
            setting.value = value;
        else
            return;
        const settingReactProps = setting[REACT_PROPS];
        settingReactProps.onChange({ target: setting });
    });
    !silent && S.Snackbar.enqueueSnackbar("Restored Settings");
};
const restoreRootlistRecur = async (leaf, folder = "") => await Promise.all(Object.keys(leaf).map(async (name) => {
    const subleaf = leaf[name];
    // isPlaylist
    if (!Array.isArray(subleaf))
        return void addPlaylist(subleaf, folder);
    if (subleaf.length === 0)
        return;
    //isCollectionOfTracks
    if (isContentOfPersonalPlaylist(subleaf))
        return void createPlaylistFromTracks(name, subleaf, folder);
    //isFolder
    const { success, uri } = await createFolder(name, SpotifyLoc.after.fromUri(folder));
    if (!success)
        return;
    for (const leaf of subleaf)
        restoreRootlistRecur(leaf, uri);
}));
