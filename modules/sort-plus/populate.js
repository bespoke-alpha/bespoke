import { fetchLastFMTrack, spotifyApi } from "../delulib/api.js";
import { _, fp } from "/hooks/deps.js";
import { S } from "../std/index.js";
import { chunkify50, progressify } from "../delulib/fp.js";
import { parseWebAPITrack } from "../delulib/parse.js";
import { getTracksFromAlbum } from "./fetch.js";
import { CONFIG } from "./settings.js";
import { SortAction, SortActionProp, joinByUri } from "./util.js";
const { URI } = S;
const fillTracksFromWebAPI = async (tracks) => {
    const ids = tracks.map(track => URI.fromString(track.uri).id);
    const fetchedTracks = await chunkify50(is => spotifyApi.tracks.get(is))(ids);
    return joinByUri(tracks, fetchedTracks.map(parseWebAPITrack));
};
const fillTracksFromAlbumTracks = async (tracks) => {
    const tracksByAlbumUri = Object.groupBy(tracks, track => track.albumUri);
    const passes = Object.keys(tracksByAlbumUri).length;
    const fn = progressify(async (tracks) => {
        const albumTracks = await getTracksFromAlbum(tracks[0].albumUri);
        const newTracks = _.intersectionBy(albumTracks, tracks, track => track.uri);
        return joinByUri(tracks, newTracks);
    }, passes);
    const sameAlbumTracksArray = Object.values(tracksByAlbumUri);
    const albumsTracks = await Promise.all(sameAlbumTracksArray.map(fn));
    return albumsTracks.flat();
};
export const fillTracksFromSpotify = (propName) => async (tracks) => {
    const tracksMissing = tracks.filter(track => track[SortActionProp[propName]] == null);
    const tracksPopulater = _.cond([
        [fp.startsWith(SortAction.SPOTIFY_PLAYCOUNT), () => fillTracksFromAlbumTracks],
        [_.stubTrue, () => fillTracksFromWebAPI],
    ])(propName);
    const filledTracks = await tracksPopulater(tracksMissing);
    return joinByUri(tracks, filledTracks);
};
const fillTrackFromLastFM = async (track) => {
    const lastfmTrack = await fetchLastFMTrack(CONFIG.LFMApiKey, track.artistName, track.name, CONFIG.lastFmUsername);
    track.lastfmPlaycount = Number(lastfmTrack.listeners);
    track.scrobbles = Number(lastfmTrack.playcount);
    track.personalScrobbles = Number(lastfmTrack.userplaycount);
    return track;
};
export const fillTracksFromLastFM = (tracks) => {
    const fn = progressify(fillTrackFromLastFM, tracks.length);
    return Promise.all(tracks.map(fn));
};
