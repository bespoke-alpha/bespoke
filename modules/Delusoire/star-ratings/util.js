import { fetchFolder, fetchPlaylistContents } from "/modules/Delusoire/delulib/platformApi.js";
import { REACT_PROPS } from "/modules/Delusoire/delulib/util.js";
import { CONFIG } from "./settings.js";
export const getTrackLists = () => Array.from(document.querySelectorAll(".main-trackList-trackList.main-trackList-indexable"));
export const getTrackListTracks = (trackList) => Array.from(trackList.querySelectorAll(".main-trackList-trackListRow"));
export const getTrackListTrackUri = (track) => {
    const rowSectionEnd = track.querySelector(".main-trackList-rowSectionEnd");
    const reactProps = rowSectionEnd[REACT_PROPS];
    const { props } = 
    // artist & local tracks & albums
    reactProps.children.at?.(-1).props.menu ??
        // playlists
        reactProps.children.props.children.at(-1).props.menu;
    return props.uri;
};
export const getNowPlayingBar = () => document.querySelector("div.main-nowPlayingBar-nowPlayingBar");
export const getCollectionActionBarRow = () => document.querySelector("div.main-actionBar-ActionBarRow");
export const playlistButtonSelector = `button[aria-label="Add to Liked Songs"], button[aria-label="Add to playlist"], button[aria-label="Remove recommendation"]`;
export const getPlaylistButton = (parent) => parent.querySelector(playlistButtonSelector);
export const getCollectionPlaylistButton = () => {
    const ab = getCollectionActionBarRow();
    return ab?.querySelector(`button[aria-label="Remove from Your Library"], button[aria-label="Save to Your Library"]`);
};
export const loadRatings = async () => {
    const ratingsFolder = await fetchFolder(CONFIG.ratingsFolderUri);
    playlistUris = ratingsFolder.items
        .map(p => [p.uri, Number(p.name)])
        .reduce((uris, [uri, rating]) => {
        uris[rating] = uri;
        return uris;
    }, []);
    const playlists = await Promise.all(playlistUris.map(fetchPlaylistContents));
    globalThis.tracksRatings = playlists
        .flatMap((tracks, rating) => tracks?.map(t => [t.uri, rating]) ?? [])
        .reduce((acc, [trackUri, rating]) => Object.assign(acc, {
        [trackUri]: Math.max(rating, acc[trackUri] ?? 0),
    }), {});
};
