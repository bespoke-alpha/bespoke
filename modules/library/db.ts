import Dexie, { Table } from "https://esm.sh/dexie";
import type { Track } from "https://esm.sh/v135/@fostertheweb/spotify-web-api-ts-sdk@1.2.1/dist/mjs/types.js";
import { chunkify50 } from "../delulib/fp.js";
import { spotifyApi } from "../delulib/api.js";
import { S } from "../std/index.js";

const { URI } = S;

// interface IsrcObject {
// 	isrc: string;
// 	uri: string;
// }

export const db = new (class extends Dexie {
	tracks!: Table<Track>;
	// isrcs!: Table<IsrcObject>;

	constructor() {
		super("library-data");
		this.version(1).stores({
			tracks: "&uri, external_ids.isrc",
			// isrcs: "&isrc, uri",
		});
	}
})();

export const getISRCsForUris = async (uris: string[]) => {
	const tracks = await db.tracks.bulkGet(uris);
	const missedTracks = tracks.reduce<number[]>((missed, track, i) => {
		track ?? missed.push(i);
		return missed;
	}, [] as number[]);

	if (missedTracks.length) {
		const missedIds = missedTracks.map(i => URI.fromString(uris[i]).id);
		const filledTracks = await chunkify50(is => spotifyApi.tracks.get(is))(missedIds);
		db.tracks.bulkAdd(filledTracks);
		missedTracks.forEach((missedTrack, i) => {
			tracks[missedTrack] = filledTracks[i];
		});
	}

	return tracks.map(track => track?.external_ids.isrc);
};
