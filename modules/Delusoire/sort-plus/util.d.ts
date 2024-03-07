import { TrackData } from "/modules/Delusoire/delulib/parse.js";
import { URIClass } from "/modules/Delusoire/std/expose/webpack.js";
export declare const SEPARATOR_URI = "spotify:separator";
export declare enum ERROR {
    LAST_SORTED_QUEUE_EMPTY = "Must sort to queue beforehand",
    LAST_SORTED_QUEUE_NOT_A_PLAYLIST = "Last sorted queue must be a playlist"
}
export type AsyncTracksOperation = (tracks: TrackData[]) => Promise<TrackData[]> | TrackData[];
export declare enum SortAction {
    SPOTIFY_PLAYCOUNT = "Spotify - Play Count",
    SPOTIFY_POPULARITY = "Spotify - Popularity",
    SPOTIFY_RELEASEDATE = "Spotify - Release Date",
    LASTFM_SCROBBLES = "LastFM - Scrobbles",
    LASTFM_PERSONALSCROBBLES = "LastFM - My Scrobbles",
    LASTFM_PLAYCOUNT = "LastFM - Play Count"
}
export declare enum SortActionIcon {
    "Spotify - Play Count" = "play",
    "Spotify - Popularity" = "heart",
    "Spotify - Release Date" = "list-view",
    "LastFM - Scrobbles" = "volume",
    "LastFM - My Scrobbles" = "artist",
    "LastFM - Play Count" = "subtitles"
}
export declare enum SortActionProp {
    "Spotify - Play Count" = "playcount",
    "Spotify - Popularity" = "popularity",
    "Spotify - Release Date" = "releaseDate",
    "LastFM - Scrobbles" = "scrobbles",
    "LastFM - My Scrobbles" = "personalScrobbles",
    "LastFM - Play Count" = "lastfmPlaycount"
}
export declare const joinByUri: (...trackss: TrackData[][]) => any;
export declare const URI_is_LikedTracks: (uri: string) => boolean;
export declare const getNameFromUri: (uri: URIClass<any>) => Promise<any>;
export declare const getTracksFromUri: any;
