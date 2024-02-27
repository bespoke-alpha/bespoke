import { S } from "/modules/std/index.js";
import { getPlaylistsFromURIs, getTracksFromURIs } from "./db.js";

const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();

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

const extractItemsUris = ({ items }: any) => items.map(item => item.uri);
const getPlaylistTracks = playlist => PlaylistAPI.getContents(playlist).then(extractItemsUris);

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
		onTracksAddedToPlaylist(playlist, await getPlaylistTracks(playlist));
	}
	await getPlaylistsFromURIs(playlists);
};

const onPlaylistsRemoved = async (playlists: string[]) => {
	for (const playlist of playlists) {
		SavedPlaylists.delete(playlist);
		onTracksRemovedFromPlaylist(playlist, await getPlaylistTracks(playlist));
	}
};

const triggerUpdate = (uris: string[]) => {
	for (const uri of uris) {
		for (const update of listeners.get(uri)?.keys() ?? []) {
			update();
		}
	}
};

const onTracksAddedToPlaylist = async (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.add(playlist));
	await getTracksFromURIs(uris);
	triggerUpdate(uris);
};

const onTracksRemovedFromPlaylist = (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.delete(playlist));
	triggerUpdate(uris);
};

export const SavedPlaylists = new Set<string>();

RootlistAPI.getContents({ limit: 50000 }).then(extractPlaylists).then(onPlaylistsAdded);
RootlistAPI.getEvents().addListener("operation_complete", async ({ data }) => {
	const playlists = data.items;
	switch (data.operation) {
		case "add": {
			return void onPlaylistsAdded(playlists);
		}
		case "remove": {
			return void onPlaylistsRemoved(playlists);
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
			onTracksRemovedFromPlaylist(
				data.uri,
				data.items.map(item => item.uri),
			);
			return;
		}
	}
});

const { React } = S;

const listeners = new Map<string, Set<() => void>>();

const useUpdate = () => React.useReducer(x => x + 1, 0)[1];
export const useLivePlaylistItems = (uri: string) => {
	const update = useUpdate();

	React.useEffect(() => {
		let ls = listeners.get(uri);
		if (!ls) {
			ls = new Set();
			listeners.set(uri, ls);
		}
		ls.add(update);
		return () => {
			ls.delete(update);
		};
	}, []);

	return PlaylistItems.get(uri);
};
