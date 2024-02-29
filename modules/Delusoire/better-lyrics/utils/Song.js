import { findLyrics } from "./LyricsProvider.js";
export class Song {
    constructor(opts) {
        this.uri = opts.uri;
        this.name = opts.name;
        this.artist = opts.artist;
        this.album = opts.album;
        this.duration = opts.duration;
        this.isLocal = opts.metadata.is_local === "true";
        this.isPaused = opts.isPaused;
        this.lyrics = findLyrics({
            uri: this.uri,
            title: this.name,
            artist: this.artist,
            album: this.album,
            durationS: this.duration / 1000,
        });
    }
}
