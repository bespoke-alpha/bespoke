import { filter } from "./funcs.js";
const lfmperiods = {
    short_term: "1month",
    medium_term: "6month",
    long_term: "overall",
};
export const LASTFM = {
    toptracks: (user, key, range) => `http://ws.audioscrobbler.com/2.0/?method=user.gettoptracks&user=${user}&api_key=${key}&format=json&period=${lfmperiods[range]}`,
    topalbums: (user, key, range) => `https://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${user}&api_key=${key}&format=json&period=${lfmperiods[range]}`,
    topartists: (user, key, range) => `https://ws.audioscrobbler.com/2.0/?method=user.gettopartists&user=${user}&api_key=${key}&format=json&period=${lfmperiods[range]}`,
    charts: (key, type) => `http://ws.audioscrobbler.com/2.0/?method=chart.gettop${type}&api_key=${key}&format=json`,
};
export const SPOTIFY = {
    toptracks: (range) => `https://api.spotify.com/v1/me/top/tracks?limit=50&offset=0&time_range=${range}`,
    topartists: (range) => `https://api.spotify.com/v1/me/top/artists?limit=50&offset=0&time_range=${range}`,
    artists: (artists) => `https://api.spotify.com/v1/artists?ids=${artists}`,
    rootlist: "sp://core-playlist/v1/rootlist",
    playlist: (uri) => `sp://core-playlist/v1/playlist/${uri}`,
    search: (track, artist) => `https://api.spotify.com/v1/search?q=track:${filter(track)}+artist:${filter(artist)}&type=track`,
    searchartist: (artist) => `https://api.spotify.com/v1/search?q=artist:${filter(artist)}&type=artist`,
    searchalbum: (album, artist) => `https://api.spotify.com/v1/search?q=${filter(album)}+artist:${filter(artist)}&type=album`,
    audiofeatures: (ids) => `https://api.spotify.com/v1/audio-features?ids=${ids}`,
    queryliked: (ids) => `https://api.spotify.com/v1/me/tracks/contains?ids=${ids}`,
};
