import { _ } from "/hooks/deps.js";
import { onTrackListMutationListeners } from "../delulib/listeners.js";
import { db, getISRCsForUris } from "./db.js";
import { PlaylistItems } from "./listeners.js";

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
