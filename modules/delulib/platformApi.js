import { SpotifyLoc } from "./util.js";
import { S } from "/modules/std/index.js";
const { Cosmos } = S;
const LibraryAPI = S.Platform.getLibraryAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();
const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistPermissionsAPI = S.Platform.getPlaylistPermissionsAPI();
const LocalFilesAPI = S.Platform.getLocalFilesAPI();
export const areInLibrary = uris => LibraryAPI.contains(...uris);
export const setInLibrary = (uris, liked) => LibraryAPI[liked ? "add" : "remove"]({ uris });
export const toggleInLibrary = async uris => {
	const liked = await areInLibrary(uris);
	const urisByLiked = Object.groupBy(uris, (_, index) => (liked[index] ? "liked" : "notLiked"));
	const ps = [];
	urisByLiked.liked?.length && ps.push(setInLibrary(urisByLiked.liked, false));
	urisByLiked.notLiked?.length && ps.push(setInLibrary(urisByLiked.notLiked, true));
	return Promise.all(ps);
};
export const fetchLikedTracks = async () =>
	(
		await LibraryAPI.getTracks({
			limit: Number.MAX_SAFE_INTEGER,
		})
	).items;
export const fetchArtistLikedTracks = async (uri, offset = 0, limit = 100) => (await LibraryAPI.getTracks({ uri, offset, limit })).items;
export const fetchPlaylistContents = async uri => (await PlaylistAPI.getContents(uri)).items;
export const createFolder = async (name, location = {}) => await RootlistAPI.createFolder(name, location);
export const addPlaylist = async (playlist, folder) => await RootlistAPI.add([playlist], folder ? SpotifyLoc.after.fromUri(folder) : {});
/* Replaced by createPlaylistFromTracks */
export const createPlaylist = async (name, location = {}) => await RootlistAPI.createPlaylist(name, location);
export const createPlaylistFromTracks = (name, tracks, folder) =>
	Cosmos.post("sp://core-playlist/v1/rootlist?responseFormat=protobufJson", {
		operation: "create",
		...(folder ? { after: folder } : {}),
		name,
		playlist: true,
		uris: tracks,
	});
export const setPlaylistVisibility = async (playlist, visibleForAll) =>
	await PlaylistPermissionsAPI.setBasePermission(playlist, visibleForAll ? "VIEWER" : "BLOCKED");
export const setPlaylistPublished = async (playlist, published) => await RootlistAPI.setPublishedState(playlist, published);
export const fetchFolder = async folder => await RootlistAPI.getContents({ folderUri: folder });
export const fetchRootFolder = () => fetchFolder(undefined);
export const addPlaylistTracks = async (playlist, tracks, location = {}) => await PlaylistAPI.add(playlist, tracks, location);
export const movePlaylistTracks = async (playlist, uids, location = {}) =>
	await PlaylistAPI.move(
		playlist,
		uids.map(uid => ({ uid })),
		location,
	);
export const removePlaylistTracks = (playlist, tracks) => PlaylistAPI.remove(playlist, tracks);
export const fetchLocalTracks = async () => await LocalFilesAPI.getTracks();
