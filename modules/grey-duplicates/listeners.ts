import { S } from "../std/index.js";
import { getPlaylistsFromURIs, getTracksFromURIs } from "./db.js";

const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();

const extractItemsUris = ({ items }: any) => items.map(item => item.uri);

const extractPlaylists = (leaf: any): string[] => {
	switch (leaf.type) {
		case "playlist": {
			return [leaf.uri];
		}
		case "folder": {
			return leaf.items.flatMap(extractPlaylists);
		}
	}
};

export const mapAssocs = (uris: string[], fn: (assocs: Set<string>) => void) => {
	for (const uri of uris) {
		const assocs = PlaylistItems.get(uri) ?? new Set<string>();
		fn(assocs);
		PlaylistItems.set(uri, assocs);
	}
};

const onPlaylistsAdded = async (playlists: string[]) => {
	for (const playlist of playlists) {
		SavedPlaylists.add(playlist);
	}
	await getPlaylistsFromURIs(playlists);
};

const onPlaylistsRemoved = (playlists: string[]) => {
	for (const playlist of playlists) {
		SavedPlaylists.delete(playlist);
	}
};

const onTracksAddedToPlaylist = async (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.add(playlist));
	await getTracksFromURIs(uris);
};

const onTracksRemovedFromPlaylist = (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.delete(playlist));
};

export const SavedPlaylists = new Set(await RootlistAPI.getContents({ limit: 50000 }).then(extractPlaylists));
RootlistAPI.getEvents().addListener("operation_complete", async ({ data }) => {
	const getUris = playlist => PlaylistAPI.getContents(playlist).then(extractItemsUris);
	const playlists = data.items;
	switch (data.operation) {
		case "add": {
			onPlaylistsAdded(playlists);
			for (const playlist of playlists) {
				onTracksAddedToPlaylist(playlist, await getUris(playlist));
			}
			return;
		}
		case "remove": {
			onPlaylistsRemoved(playlists);
			for (const playlist of playlists) {
				onTracksRemovedFromPlaylist(playlist, await getUris(playlist));
			}
			return;
		}
	}
});

export const PlaylistItems = new Map<string, Set<string>>();

for (const playlist of SavedPlaylists) {
	const uris = await PlaylistAPI.getContents(playlist).then(extractItemsUris);
	onTracksAddedToPlaylist(playlist, uris);
}

PlaylistAPI.getEvents().addListener("operation_complete", ({ data }) => {
	switch (data.operation) {
		case "add": {
			onTracksAddedToPlaylist(data.uri, data.uris);
			return;
		}
		case "remove": {
			onTracksRemovedFromPlaylist(data.uri, data.uris);
			return;
		}
	}
});
