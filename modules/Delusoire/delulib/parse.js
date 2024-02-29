export const parseTopTrackFromArtist = ({ track }) => ({
    uri: track.uri,
    uid: undefined,
    name: track.name,
    albumUri: track.albumOfTrack.uri,
    albumName: undefined,
    artistUris: track.artists.items.map(artist => artist.uri),
    artistName: track.artists.items[0].profile.name,
    durationMilis: track.duration.totalMilliseconds,
    playcount: Number(track.playcount),
    popularity: undefined,
    releaseDate: undefined,
});
export const parseArtistLikedTrack = (track) => ({
    uri: track.uri,
    uid: undefined,
    name: track.name,
    albumUri: track.album.uri,
    albumName: track.album.name,
    artistUris: track.artists.map(artist => artist.uri),
    artistName: track.artists[0].name,
    durationMilis: track.duration.milliseconds,
    playcount: undefined,
    popularity: undefined,
    releaseDate: undefined,
});
export const parseAlbumTrack = ({ track }) => ({
    uri: track.uri,
    uid: undefined,
    name: track.name,
    albumUri: "", // gets filled in later
    albumName: "", // gets filled in later
    artistUris: track.artists.items.map(artist => artist.uri),
    artistName: track.artists.items[0].profile.name,
    durationMilis: track.duration.totalMilliseconds,
    playcount: Number(track.playcount),
    popularity: undefined,
    releaseDate: -1, // gets filled in later
});
export const parsePlaylistAPITrack = (track) => ({
    uri: track.uri,
    uid: track.uid,
    name: track.name,
    albumUri: track.album.uri,
    albumName: track.album.name,
    artistUris: track.artists.map(artist => artist.uri),
    artistName: track.artists[0].name,
    durationMilis: track.duration.milliseconds,
    playcount: undefined,
    popularity: undefined,
    releaseDate: undefined,
});
export const parseWebAPITrack = (track) => ({
    uri: track.uri,
    uid: undefined,
    name: track.name,
    albumUri: track.album.uri,
    albumName: track.album.name,
    artistUris: track.artists.map(artist => artist.uri),
    artistName: track.artists[0].name,
    durationMilis: track.duration_ms,
    playcount: undefined,
    popularity: track.popularity,
    releaseDate: new Date(track.album.release_date).getTime(),
});
export const parseLibraryAPILikedTracks = (track) => ({
    uri: track.uri,
    uid: undefined,
    name: track.name,
    albumUri: track.album.uri,
    albumName: track.album.name,
    artistUris: track.artists.map(artist => artist.uri),
    artistName: track.artists[0].name,
    durationMilis: track.duration.milliseconds,
    playcount: undefined,
    popularity: undefined,
    releaseDate: undefined,
});
