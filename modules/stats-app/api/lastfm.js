const SpotifyToLFMTimerange = {
    short_term: "1month",
    medium_term: "6month",
    long_term: "overall",
};
const LFMEndpoint = "https://ws.audioscrobbler.com/2.0/";
// TODO: add return types
export const fetchLFMTopTracks = (key) => (username, range) => {
    const url = new URL(LFMEndpoint);
    url.searchParams.append("method", "user.getTopTracks");
    url.searchParams.append("user", username);
    url.searchParams.append("api_key", key);
    url.searchParams.append("format", "json");
    url.searchParams.append("period", SpotifyToLFMTimerange[range]);
    return fetch(url).then(res => res.json());
};
export const fetchLFMTopAlbums = (key) => (username, range) => {
    const url = new URL(LFMEndpoint);
    url.searchParams.append("method", "user.getTopAlbums");
    url.searchParams.append("user", username);
    url.searchParams.append("api_key", key);
    url.searchParams.append("format", "json");
    url.searchParams.append("period", SpotifyToLFMTimerange[range]);
    return fetch(url).then(res => res.json());
};
export const fetchLFMTopArtists = (key) => (username, range) => {
    const url = new URL(LFMEndpoint);
    url.searchParams.append("method", "user.getTopArtists");
    url.searchParams.append("user", username);
    url.searchParams.append("api_key", key);
    url.searchParams.append("format", "json");
    url.searchParams.append("period", SpotifyToLFMTimerange[range]);
    return fetch(url).then(res => res.json());
};
