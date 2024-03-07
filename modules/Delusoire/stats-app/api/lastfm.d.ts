import type { ValueOf } from "../util/types.js";
import type { SpotifyTimeRange } from "./spotify.js";
import { LFMTopAlbums } from "./types/LFMTopAlbums.js";
import { LFMTopArtists } from "./types/LFMTopArtists.js";
import { LFMTopTracks } from "./types/LFMTopTracks.js";
export declare const fetchLFMTopTracks: (key: string) => (username: string, range: keyof typeof SpotifyTimeRange) => Promise<LFMTopTracks>;
export declare const fetchLFMTopAlbums: (key: string) => (username: string, range: ValueOf<typeof SpotifyTimeRange>) => Promise<LFMTopAlbums>;
export declare const fetchLFMTopArtists: (key: string) => (username: string, range: keyof typeof SpotifyTimeRange) => Promise<LFMTopArtists>;
