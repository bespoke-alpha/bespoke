import { createFolder } from "/modules/Delusoire/delulib/platformApi.js";
import { settings } from "./index.js";
const SORTED_PLAYLISTS_FOLDER_NAME = "📀 Sorted Playlists";
export const CONFIG = settings
    .addToggle({ id: "preventDuplicates", desc: "Prevent Duplicates" }, () => true)
    .addToggle({ id: "descending", desc: "Descending" }, () => true)
    .addToggle({ id: "artistAllDiscography", desc: "All of the artist's Discography" })
    .addToggle({ id: "artistTopTracks", desc: "Top Tracks" }, () => true)
    .addToggle({ id: "artistPopularReleases", desc: "Popular Releases" }, () => true)
    .addToggle({ id: "artistSingles", desc: "Singles" })
    .addToggle({ id: "artistAlbums", desc: "Albums" })
    .addToggle({ id: "artistCompilations", desc: "Compilations" })
    .addToggle({ id: "artistLikedTracks", desc: "Liked Tracks" }, () => true)
    .addToggle({ id: "artistAppearsOn", desc: "Appears On" })
    .addInput({ id: "lastFmUsername", desc: "Last.fm Username", inputType: "text" }, () => "Username")
    .addInput({ id: "LFMApiKey", desc: "Last.fm API Key", inputType: "text" }, () => "********************************")
    .addInput({
    id: "sortedPlaylistsFolderUri",
    desc: "Sorted Playlists folder uri",
    inputType: "text",
}, async () => (await createFolder(SORTED_PLAYLISTS_FOLDER_NAME)).uri)
    .finalize().cfg;
