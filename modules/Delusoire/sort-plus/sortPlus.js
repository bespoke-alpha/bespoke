import { setQueue as _setQueue, createQueueItem } from "/modules/Delusoire/delulib/util.js";
import { _, fp } from "/modules/Delusoire/std/deps.js";
import { S } from "/modules/Delusoire/std/index.js";
import { fillTracksFromLastFM, fillTracksFromSpotify } from "./populate.js";
import { CONFIG } from "./settings.js";
import { SEPARATOR_URI, SortAction, SortActionIcon, SortActionProp, URI_is_LikedTracks, getTracksFromUri } from "./util.js";
import { SVGIcons } from "/modules/Delusoire/std/index.js";
export * from "./playlistsInterop.js";
const PlayerAPI = S.Platform.getPlayerAPI();
export let lastFetchedUri;
export let lastSortAction;
globalThis.lastSortedQueue = [];
const populateTracks = _.cond([
    [fp.startsWith("Spotify"), fillTracksFromSpotify],
    [fp.startsWith("LastFM"), () => fillTracksFromLastFM],
]);
const setQueue = (tracks) => {
    if (PlayerAPI._state.item?.uid == null)
        return void S.Snackbar.enqueueSnackbar("Queue is null!", { variant: "error" });
    const dedupedQueue = _.uniqBy(tracks, "uri");
    globalThis.lastSortedQueue = dedupedQueue;
    const isLikedTracks = URI_is_LikedTracks(lastFetchedUri);
    const queue = globalThis.lastSortedQueue.concat({ uri: SEPARATOR_URI }).map(createQueueItem(isLikedTracks));
    return _setQueue(queue, isLikedTracks ? undefined : lastFetchedUri);
};
// Menu
const sortTracksBy = (sortAction, sortFn, descending) => async (uri) => {
    lastSortAction = sortAction;
    lastFetchedUri = uri;
    const tracks = await getTracksFromUri(uri);
    let sortedTracks = await sortFn(tracks);
    if (CONFIG.preventDuplicates) {
        sortedTracks = _.uniqBy(sortedTracks, "name");
    }
    descending && sortedTracks.reverse();
    return await setQueue(sortedTracks);
};
const GenericSortBySubMenuItem = ({ descending, sortAction }) => {
    const { props } = useMenuItem();
    const uri = props.uri;
    return (S.React.createElement(S.ReactComponents.MenuItem, { disabled: false, onClick: () => {
            const sortActionProp = SortActionProp[sortAction];
            const sortFn = async (tracks) => {
                const filledTracks = await populateTracks(sortAction)(tracks);
                const filteredTracks = filledTracks.filter(track => track[sortActionProp] != null);
                return _.sortBy(filteredTracks, sortActionProp);
            };
            sortTracksBy(sortAction, sortFn, descending)(uri);
        }, leadingIcon: createIconComponent({ icon: SVGIcons[SortActionIcon[sortAction]] }) }, sortAction));
};
const SubMenuItems = Object.values(SortAction).map(sortAction => (props) => S.React.createElement(GenericSortBySubMenuItem, {
    ...props,
    sortAction,
}));
import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";
import { useMenuItem } from "/modules/Delusoire/std/registers/menu.js";
const SortByShuffleSubMenuItem = ({ descending }) => {
    const { props } = useMenuItem();
    const uri = props.uri;
    return (S.React.createElement(S.ReactComponents.MenuItem, { disabled: false, onClick: () => sortTracksBy("True Shuffle", _.shuffle, descending)(uri), leadingIcon: createIconComponent({ icon: SVGIcons.shuffle }) }, "True shuffle"));
};
const SortByStarsSubMenuItem = ({ descending }) => {
    if (!globalThis.tracksRatings)
        return;
    const { props } = useMenuItem();
    const uri = props.uri;
    return (S.React.createElement(S.ReactComponents.MenuItem, { disabled: false, onClick: () => sortTracksBy("Stars", fp.sortBy((track) => globalThis.tracksRatings[track.uri] ?? 0), descending)(uri), leadingIcon: createIconComponent({ icon: SVGIcons["heart-active"] }) }, "Stars"));
};
SubMenuItems.push(SortByShuffleSubMenuItem, SortByStarsSubMenuItem);
export const FolderPickerMenuItem = () => {
    const { props } = useMenuItem();
    const { uri } = props.reference;
    return (S.React.createElement(S.ReactComponents.MenuItem, { disabled: false, onClick: () => {
            CONFIG.sortedPlaylistsFolderUri = uri;
        }, leadingIcon: createIconComponent({ icon: SVGIcons["playlist-folder"] }) }, "Choose for Sorted Playlists"));
};
export const SortBySubMenu = () => {
    const { modifierKeyHeld } = S.useContextMenuState();
    const descending = modifierKeyHeld ^ Number(CONFIG.descending);
    const leadingIcon = createIconComponent({ icon: SVGIcons[descending ? "chart-down" : "chart-up"] });
    return (S.React.createElement(S.ReactComponents.MenuItemSubMenu, { leadingIcon: leadingIcon, displayText: "Sort by", depth: 1, placement: "right-start", disabled: false }, SubMenuItems.map(SubMenuItem => (S.React.createElement(SubMenuItem, { descending: descending })))));
};
