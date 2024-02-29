import Dexie, { Table } from "https://esm.sh/dexie";
import type { Track } from "https://esm.sh/v135/@fostertheweb/spotify-web-api-ts-sdk/dist/mjs/types.js";
import { chunkify50 } from "/modules/Delusoire/delulib/fp.js";
import { spotifyApi } from "/modules/Delusoire/delulib/api.js";
import { S } from "/modules/Delusoire/std/index.js";
import { _ } from "/modules/Delusoire/std/deps.js";

const { URI } = S;

export const db = new (class extends Dexie {
	tracks!: Table<Track>;
	playlists!: Table;

	constructor() {
		super("library-db");
		this.version(1).stores({
			tracks: "&uri, external_ids.isrc",
			playlists: "&metadata.uri",
		});
	}
})();

// TODO: execute this in a worker
const fetchOrPopulateDB =
	<A, B>(table: Table<A, B>, fetcher: (primaryKeys: B[]) => Promise<A[]>) =>
	async (primaryKeys: B[]) => {
		const objs = await table.bulkGet(primaryKeys);
		const missed = objs.reduce((missed, obj, i) => {
			obj ?? missed.push(i);
			return missed;
		}, [] as number[]);

		if (missed.length) {
			const fillers = await fetcher(missed.map(i => primaryKeys[i]));
			table.bulkAdd(fillers);
			missed.forEach((i, j) => {
				objs[i] = fillers[j];
			});
		}

		return objs;
	};

export const getTracksFromURIs = fetchOrPopulateDB(db.tracks, (uris: string[]) => {
	const ids = uris.map(uri => URI.fromString(uri).id);
	return chunkify50(is => spotifyApi.tracks.get(is))(ids);
});

const PlaylistAPI = S.Platform.getPlaylistAPI();

export const getPlaylistsFromURIs = fetchOrPopulateDB(db.playlists, (uris: string[]) => Promise.all(uris.map(uri => PlaylistAPI.getPlaylist(uri))));
