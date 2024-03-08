import { fetchLastFMTrack, spotifyApi } from "/modules/Delusoire/delulib/api.js";
import { waitForElement } from "/modules/Delusoire/std/api/util.js";
import { CONFIG } from "./settings.js";
import { fetchArtistRelated } from "/modules/Delusoire/delulib/GraphQL/fetchArtistRelated.js";
import { onHistoryChanged } from "/modules/Delusoire/delulib/listeners.js";
import { _ } from "/modules/Delusoire/std/deps.js";
import { Events, S } from "/modules/Delusoire/std/index.js";
import "./components.js";
const { URI } = S;
const PlayerAPI = S.Platform.getPlayerAPI();
const fetchLastFMTagsForNowPlayingTrack = async () => {
    const item = PlayerAPI.getState()?.item;
    if (!item)
        return [];
    const track = await fetchLastFMTrack(CONFIG.LFMApiKey, item.artists[0].name, item.name);
    const tags = track.toptags.tag.map(tag => tag.name);
    const deletedTagRegex = /^-\d{13}$/;
    const blacklistedTags = ["MySpotigramBot"];
    return tags.filter(tag => !deletedTagRegex.test(tag) && !blacklistedTags.includes(tag));
};
const nowPlayingGenreContainerEl = document.createElement("genre-container");
nowPlayingGenreContainerEl.fetchGenres = fetchLastFMTagsForNowPlayingTrack;
nowPlayingGenreContainerEl.className += " ellipsis-one-line main-type-finale";
nowPlayingGenreContainerEl.style.gridArea = "genres";
(async () => {
    const trackInfoContainer = await waitForElement("div.ZcNcu7WZgOAz_Mkcoff3");
    trackInfoContainer.appendChild(nowPlayingGenreContainerEl);
})();
Events.Player.songchanged.on(state => {
    nowPlayingGenreContainerEl.uri = state.item?.uri;
});
const getArtistsGenresOrRelated = async (artistsUris) => {
    const getArtistsGenres = async (artistsUris) => {
        const ids = artistsUris.map(uri => URI.fromString(uri).id);
        const artists = await spotifyApi.artists.get(_.compact(ids));
        const genres = new Set(artists.flatMap(artist => artist.genres));
        return Array.from(genres);
    };
    const allGenres = await getArtistsGenres(artistsUris);
    if (allGenres.length)
        return allGenres;
    const relatedArtists = await fetchArtistRelated(artistsUris[0]);
    relatedArtists.map(artist => artist.uri);
    if (allGenres.length)
        return allGenres;
    const artistRelated = await fetchArtistRelated(artistsUris[0]);
    return _.chunk(artistRelated.map(a => a.uri), 5).reduce(async (acc, arr5uris) => ((await acc).length ? await acc : await getArtistsGenres(arr5uris)), Promise.resolve([]));
};
const updateArtistPage = async (uri) => {
    const artistGenreContainerEl = document.createElement("genre-container");
    artistGenreContainerEl.name = "Artist Genres";
    artistGenreContainerEl.uri = uri.toString();
    artistGenreContainerEl.fetchGenres = uri => getArtistsGenresOrRelated([uri]);
    const lastHeaderTextEl = document.querySelector("div.RP2rRchy4i8TIp1CTmb7");
    const headerTextEl = await waitForElement("div.RP2rRchy4i8TIp1CTmb7", undefined, undefined, lastHeaderTextEl);
    const headerTextDetailsEl = await waitForElement("span.Ydwa1P5GkCggtLlSvphs");
    headerTextEl.insertBefore(artistGenreContainerEl, headerTextDetailsEl);
};
onHistoryChanged(uri => URI.is.Artist(uri), updateArtistPage);
