import { S } from "../std/index.js";
const LibraryAPI = S.Platform.getLibraryAPI();
const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();
const extractItemsUris = ({ items }) => items.map(item => item.uri);
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
const extractPlaylists = (leaf) => {
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
const mapAssocs = (uris, fn) => {
    for (const uri of uris) {
        const assocs = PlaylistItems.get(uri) ?? new Set();
        fn(assocs);
        PlaylistItems.set(uri, assocs);
    }
};
const onUrisAdded = (playlist, uris) => {
    mapAssocs(uris, o => o.add(playlist));
};
const onUrisRemoved = (playlist, uris) => {
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
const PlaylistItems = new Map();
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
