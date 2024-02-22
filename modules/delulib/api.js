import { SpotifyApi } from "https://esm.sh/@fostertheweb/spotify-web-api-ts-sdk";
import { _ } from "/hooks/deps.js";
import { S } from "../std/index.js";
const getAccessToken = () => S.Platform.getAuthorizationAPI().getState().token.accessToken;
export const spotifyApi = SpotifyApi.withAccessToken(undefined, {}, {
    beforeRequest(_, opts) {
        opts.headers.Authorization = `Bearer ${getAccessToken()}`;
    },
});
/*                          Spotify Web API                                   */
export const fetchWebSoundOfSpotifyPlaylist = async (genre) => {
    const name = `The Sound Of ${genre}`;
    const re = new RegExp(`^${_.escapeRegExp(name)}$`, "i");
    const res = await spotifyApi.search(name, ["playlist"]);
    const item = res.playlists.items.find(item => item?.owner.id === "thesoundsofspotify" && re.test(item.name));
    return item?.uri;
};
export const fetchLastFMTrack = async (LFMApiKey, artist, trackName, lastFmUsername = "") => {
    const url = new URL("https://ws.audioscrobbler.com/2.0/");
    url.searchParams.append("method", "track.getInfo");
    url.searchParams.append("api_key", LFMApiKey);
    url.searchParams.append("artist", artist);
    url.searchParams.append("track", trackName);
    url.searchParams.append("format", "json");
    url.searchParams.append("username", lastFmUsername);
    const res = (await fetch(url).then(res => res.json()));
    return res.track;
};
export const searchYoutube = async (YouTubeApiKey, searchString) => {
    const url = new URL("https://www.googleapis.com/youtube/v3/search");
    url.searchParams.append("part", "snippet");
    url.searchParams.append("maxResults", "10");
    url.searchParams.append("q", searchString);
    url.searchParams.append("type", "video");
    url.searchParams.append("key", YouTubeApiKey);
    return (await fetch(url).then(res => res.json()));
};
