import { _ } from "/hooks/deps.js";
import { onTrackListMutationListeners } from "../delulib/listeners.js";
import { db, getISRCsForUris } from "./db.js";
import { PlaylistItems } from "./listeners.js";

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

const setTrackGreyed = (track: HTMLDivElement, greyed: boolean) => {
	track.style.backgroundColor = greyed ? "gray" : undefined;
	track.style.opacity = greyed ? "0.3" : "1";
};

onTrackListMutationListeners.push(async (tracklist, tracks) => {
	const uris = tracks.map(track => track.props.uri);
	const isrcs = await getISRCsForUris(uris);

	const playlistItems = Array.from(PlaylistItems.entries())
		.map(([k, v]) => v.size > 0 && k)
		.filter(Boolean);

	tracks.map(async (track, i) => {
		const uri = uris[i];
		const isrc = isrcs[i];
		if (!isrc) return;

		const urisForIsrc = await db.tracks.where("external_ids.isrc").equals(isrc).primaryKeys();
		const urisForIsrcInPlaylists = _.intersection(urisForIsrc, playlistItems);
		setTrackGreyed(track, urisForIsrcInPlaylists.length > 1 && urisForIsrcInPlaylists.includes(uri));
	});
});
