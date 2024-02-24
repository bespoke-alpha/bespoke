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

// export const getMainUrisForIsrcs = async (isrcs: string[]) => {
//     const tracks = await db.isrcs.bulkGet(isrcs)
//     const missedTracks = tracks.reduce((missed, track, i) => {
//         track || missed.push(i)
//         return missed
//     }, [] as number[])

//     if (missedTracks.length) {
//         const missedIsrcs = missedTracks.map(i => isrcs[i])
//         const resultsIsrcs = await Promise.allSettled(missedIsrcs.map(isrc => searchTracks(`isrc:${isrc}`, 0, 1)))
//         const filledTracks = _.compact(
//             resultsIsrcs.map((resultsIsrc, i) => {
//                 const isrc = isrcs[i]
//                 if (resultsIsrc.status === "fulfilled") {
//                     const uri = resultsIsrc.value[0]?.item.data.uri
//                     if (!uri) {
//                         console.error("Couldn't get matching track for isrc:", isrc)
//                         return
//                     }
//                     return { isrc, uri }
//                 }
//                 console.error("Failed searching track for isrc:", isrc)
//             }),
//         )
//         db.isrcs.bulkAdd(filledTracks)
//         missedTracks.forEach((missedTrack, i) => {
//             tracks[missedTrack] = filledTracks[i]
//         })
//     }

//     return tracks.map(track => track?.uri)
// }

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
