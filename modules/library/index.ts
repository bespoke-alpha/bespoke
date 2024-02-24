import { S } from "../std/index.js";

import { onTrackListMutationListeners } from "../delulib/listeners.js"

import Dexie, { Table } from "https://esm.sh/dexie"

interface IsrcObject {
    isrc: string
    uri: string
}

const db = new (class extends Dexie {
    tracks!: Table<Track>
    isrcs!: Table<IsrcObject>

    constructor() {
        super("library-data")
        this.version(1).stores({
            tracks: "&uri, external_ids.isrc",
            isrcs: "&isrc, uri",
        })
    }
})()

import { searchTracks } from "../delulib/GraphQL/searchTracks.js"
import { spotifyApi } from "../delulib/api.js"
import { chunkify50 } from "../delulib/fp.js"
import { Track } from "https://esm.sh/v135/@fostertheweb/spotify-web-api-ts-sdk@1.2.1/dist/mjs/types.js"
import { _ } from "/hooks/deps.js"

const { URI } = S

export const getMainUrisForIsrcs = async (isrcs: string[]) => {
    const tracks = await db.isrcs.bulkGet(isrcs)
    const missedTracks = tracks.reduce((missed, track, i) => {
        track || missed.push(i)
        return missed
    }, [] as number[])

    if (missedTracks.length) {
        const missedIsrcs = missedTracks.map(i => isrcs[i])
        const resultsIsrcs = await Promise.allSettled(missedIsrcs.map(isrc => searchTracks(`isrc:${isrc}`, 0, 1)))
        const filledTracks = _.compact(
            resultsIsrcs.map((resultsIsrc, i) => {
                const isrc = isrcs[i]
                if (resultsIsrc.status === "fulfilled") {
                    const uri = resultsIsrc.value[0]?.item.data.uri
                    if (!uri) {
                        console.error("Couldn't get matching track for isrc:", isrc)
                        return
                    }
                    return { isrc, uri }
                }
                console.error("Failed searching track for isrc:", isrc)
            }),
        )
        db.isrcs.bulkAdd(filledTracks)
        missedTracks.forEach((missedTrack, i) => {
            tracks[missedTrack] = filledTracks[i]
        })
    }

    return tracks.map(track => track?.uri)
}

export const getISRCsForUris = async (uris: string[]) => {
    const tracks = await db.tracks.bulkGet(uris)
    const missedTracks = tracks.reduce<number[]>((missed, track, i) => {
        track ?? missed.push(i)
        return missed
    }, [] as number[])

    if (missedTracks.length) {
        const missedIds = missedTracks.map(i => URI.fromString(uris[i]).id)
        const filledTracks = await chunkify50(is => spotifyApi.tracks.get(is))(missedIds)
        db.tracks.bulkAdd(filledTracks)
        missedTracks.forEach((missedTrack, i) => {
            tracks[missedTrack] = filledTracks[i]
        })
    }

    return tracks.map(track => track?.external_ids.isrc)
}

const LibraryAPI = S.Platform.getLibraryAPI();
const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();

const extractItemsUris = ({ items }: any) => items.map(item => item.uri);

// Liked tracks, albums, episodes, artists ...
const Library = new Set(await LibraryAPI.getContents({ limit: 50000 }).then(extractItemsUris));
LibraryAPI.getEvents().addListener("operation_complete", ({ data }) => {
	switch (data.operation) {
		case "add": {
			for (const uri of data.uris) {
				Library.add(uri);
			}
			return;
		}
		case "remove": {
			for (const uri of data.uris) {
				Library.delete(uri);
			}
			return;
		}
	}
});

const extractPlaylists = (leaf: any): string[] => {
	switch (leaf.type) {
		case "playlist": {
			return [leaf.uri];
		}
		case "folder": {
			return leaf.items.flatMap(extractPlaylists);
		}
		default:
			throw "Unhandled type from RootlistAPI.getContents()";
	}
};

const mapAssocs = (uris: string[], fn: (assocs: Set<string>) => void) => {
	for (const uri of uris) {
		const assocs = PlaylistItems.get(uri) ?? new Set<string>();
		fn(assocs);
		PlaylistItems.set(uri, assocs);
	}
};

const onUrisAdded = async (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.add(playlist));
	await getISRCsForUris(uris)
};

const onUrisRemoved = (playlist: string, uris: string[]) => {
	mapAssocs(uris, o => o.delete(playlist));
};

const SavedPlaylists = new Set(await RootlistAPI.getContents({ limit: 50000 }).then(extractPlaylists));
RootlistAPI.getEvents().addListener("operation_complete", async ({ data }) => {
	switch (data.operation) {
		case "add": {
			for (const playlist of data.items) {
				SavedPlaylists.add(playlist);
				const uris = await PlaylistAPI.getContents(playlist).then(extractItemsUris);
				onUrisAdded(playlist, uris);
			}
			return;
		}
		case "remove": {
			for (const playlist of data.items) {
				SavedPlaylists.delete(playlist);
				const uris = await PlaylistAPI.getContents(playlist).then(extractItemsUris);
				onUrisRemoved(playlist, uris);
			}
			return;
		}
	}
});

const PlaylistItems = new Map<string, Set<string>>();

for (const playlist of SavedPlaylists) {
	const uris = await PlaylistAPI.getContents(playlist).then(extractItemsUris);
	onUrisAdded(playlist, uris);
}

PlaylistAPI.getEvents().addListener("operation_complete", ({ data }) => {
	switch (data.operation) {
		case "add": {
			onUrisAdded(data.uri, data.uris);
			return;
		}
		case "remove": {
			onUrisRemoved(data.uri, data.uris);
			return;
		}
	}
});

const setTrackGreyed = (track: HTMLDivElement, greyed: boolean) => {
    track.style.backgroundColor = greyed ?  "gray" : undefined
    track.style.opacity = greyed ? "0.3" : "1"
}

onTrackListMutationListeners.push(async (tracklist, tracks) => {
    const uris = tracks.map(track => track.props.uri)
    const isrcs = await getISRCsForUris(uris)

	const playlistItems = Array.from(PlaylistItems.entries()).map(([k, v]) => v.size > 0 && k).filter(Boolean)

    tracks.map(async (track, i) => {
		const uri = uris[i]
		const isrc = isrcs[i]
		if (!isrc) return

		const urisForIsrc = await db.tracks.where("external_ids.isrc").equals(isrc).primaryKeys()
		const urisForIsrcInPlaylists = _.intersection(urisForIsrc, playlistItems)
        setTrackGreyed(track, urisForIsrcInPlaylists.length > 1 && urisForIsrcInPlaylists.includes(uri))
    })
})
