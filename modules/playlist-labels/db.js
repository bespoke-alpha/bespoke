import Dexie from "https://esm.sh/dexie";
import { chunkify50 } from "/modules/delulib/fp.js";
import { spotifyApi } from "/modules/delulib/api.js";
import { S } from "/modules/std/index.js";
const { URI } = S;
export const db = new (class extends Dexie {
	constructor() {
		super("library-data");
		this.version(1).stores({
			tracks: "&uri, external_ids.isrc",
			playlists: "&metadata.uri",
		});
	}
})();
const fetchOrPopulateDB = (table, fetcher) => async primaryKeys => {
	const objs = await table.bulkGet(primaryKeys);
	const missed = objs.reduce((missed, obj, i) => {
		obj ?? missed.push(i);
		return missed;
	}, []);
	if (missed.length) {
		const fillers = await fetcher(missed.map(i => primaryKeys[i]));
		table.bulkAdd(fillers);
		missed.forEach((i, j) => {
			objs[i] = fillers[j];
		});
	}
	return objs;
};
export const getTracksFromURIs = fetchOrPopulateDB(db.tracks, uris => {
	const ids = uris.map(uri => URI.fromString(uri).id);
	return chunkify50(is => spotifyApi.tracks.get(is))(ids);
});
const PlaylistAPI = S.Platform.getPlaylistAPI();
export const getPlaylistsFromURIs = fetchOrPopulateDB(db.playlists, uris => Promise.all(uris.map(uri => PlaylistAPI.getPlaylist(uri))));
