import { _, fp } from "/modules/std/deps.js";
import { S } from "/modules/std/index.js";
import { spotifyApi } from "/modules/delulib/api.js";
import { getLikedTracks, getTracksFromAlbum, getTracksFromArtist, getTracksFromPlaylist } from "./fetch.js";
const { URI } = S;
export const SEPARATOR_URI = "spotify:separator";
export var ERROR;
(function (ERROR) {
    ERROR["LAST_SORTED_QUEUE_EMPTY"] = "Must sort to queue beforehand";
    ERROR["LAST_SORTED_QUEUE_NOT_A_PLAYLIST"] = "Last sorted queue must be a playlist";
})(ERROR || (ERROR = {}));
export var SortAction;
(function (SortAction) {
    SortAction["SPOTIFY_PLAYCOUNT"] = "Spotify - Play Count";
    SortAction["SPOTIFY_POPULARITY"] = "Spotify - Popularity";
    SortAction["SPOTIFY_RELEASEDATE"] = "Spotify - Release Date";
    SortAction["LASTFM_SCROBBLES"] = "LastFM - Scrobbles";
    SortAction["LASTFM_PERSONALSCROBBLES"] = "LastFM - My Scrobbles";
    SortAction["LASTFM_PLAYCOUNT"] = "LastFM - Play Count";
})(SortAction || (SortAction = {}));
export var SortActionIcon;
(function (SortActionIcon) {
    SortActionIcon["Spotify - Play Count"] = "play";
    SortActionIcon["Spotify - Popularity"] = "heart";
    SortActionIcon["Spotify - Release Date"] = "list-view";
    SortActionIcon["LastFM - Scrobbles"] = "volume";
    SortActionIcon["LastFM - My Scrobbles"] = "artist";
    SortActionIcon["LastFM - Play Count"] = "subtitles";
})(SortActionIcon || (SortActionIcon = {}));
export var SortActionProp;
(function (SortActionProp) {
    SortActionProp["Spotify - Play Count"] = "playcount";
    SortActionProp["Spotify - Popularity"] = "popularity";
    SortActionProp["Spotify - Release Date"] = "releaseDate";
    SortActionProp["LastFM - Scrobbles"] = "scrobbles";
    SortActionProp["LastFM - My Scrobbles"] = "personalScrobbles";
    SortActionProp["LastFM - Play Count"] = "lastfmPlaycount";
})(SortActionProp || (SortActionProp = {}));
export const joinByUri = (...trackss) => _(trackss)
    .flatten()
    .map((fp.omitBy(_.isNil)))
    .groupBy("uri")
    .mapValues(sameUriTracks => Object.assign({}, ...sameUriTracks))
    .values()
    .value();
export const URI_is_LikedTracks = (uri) => {
    const uriObj = URI.fromString(uri);
    return uriObj.type === URI.Types.COLLECTION && uriObj.category === "tracks";
};
export const getNameFromUri = async (uri) => {
    switch (uri.type) {
        case URI.Types.ALBUM: {
            const album = await spotifyApi.albums.get(uri.id);
            return album.name;
        }
        case URI.Types.ARTIST: {
            const artist = await spotifyApi.artists.get(uri.id);
            return artist.name;
        }
        case URI.Types.COLLECTION:
            if (uri.category === "tracks")
                return "Liked Tracks";
            break;
        case URI.Types.PLAYLIST:
        case URI.Types.PLAYLIST_V2: {
            const playlist = await spotifyApi.playlists.getPlaylist(uri.id);
            return playlist.name;
        }
    }
};
export const getTracksFromUri = _.cond([
    [URI.is.Album, getTracksFromAlbum],
    [URI.is.Artist, getTracksFromArtist],
    [URI_is_LikedTracks, getLikedTracks],
    [URI.is.PlaylistV1OrV2, getTracksFromPlaylist],
]);
