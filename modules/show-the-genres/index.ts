import { fetchLastFMTrack, spotifyApi } from "/modules/delulib/api.js";
import { waitForElement } from "/modules/delulib/util.js";

import { CONFIG } from "./settings.js";

import "./components.js";
import { fetchArtistRelated } from "/modules/delulib/GraphQL/fetchArtistRelated.js";
import { onHistoryChanged } from "/modules/delulib/listeners.js";
import { _ } from "/modules/std/deps.js";
import { Events, S } from "/modules/std/index.js";

const { URI } = S;
const PlayerAPI = S.Platform.getPlayerAPI();

const fetchLastFMTagsForNowPlayingTrack = async () => {
	const item = PlayerAPI.getState()?.item;
	if (!item) return [];
	const track = await fetchLastFMTrack(CONFIG.LFMApiKey, item.artists[0], item.name);
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
	const trackInfoContainer = await waitForElement("div.main-trackInfo-container");
	trackInfoContainer.appendChild(nowPlayingGenreContainerEl);
})();

Events.Player.songchanged.on(state => {
	nowPlayingGenreContainerEl.uri = state.item?.uri;
});

const getArtistsGenresOrRelated = async (artistsUris: string[]) => {
	const getArtistsGenres = async (artistsUris: string[]) => {
		const ids = artistsUris.map(uri => URI.fromString(uri).id as string);
		const artists = await spotifyApi.artists.get(_.compact(ids));
		const genres = new Set(artists.flatMap(artist => artist.genres));
		return Array.from(genres);
	};

	const allGenres = await getArtistsGenres(artistsUris);

	if (allGenres.length) return allGenres;

	const relatedArtists = await fetchArtistRelated(artistsUris[0]);

	relatedArtists.map(artist => artist.uri);

	if (allGenres.length) return allGenres;

	const artistRelated = await fetchArtistRelated(artistsUris[0]);

	return _.chunk(
		artistRelated.map(a => a.uri),
		5,
	).reduce(async (acc, arr5uris) => ((await acc).length ? await acc : await getArtistsGenres(arr5uris)), Promise.resolve([] as string[]));
};

const updateArtistPage = async (uri: string) => {
	const artistGenreContainerEl = document.createElement("genre-container");
	artistGenreContainerEl.name = "Artist Genres";
	artistGenreContainerEl.uri = uri.toString();
	artistGenreContainerEl.fetchGenres = uri => getArtistsGenresOrRelated([uri]);

	const lastHeaderTextEl = document.querySelector("div.main-entityHeader-headerText");
	const headerTextEl = await waitForElement("div.main-entityHeader-headerText", undefined, undefined, lastHeaderTextEl);
	const headerTextDetailsEl = await waitForElement("span.main-entityHeader-detailsText");
	headerTextEl.insertBefore(artistGenreContainerEl, headerTextDetailsEl);
};

onHistoryChanged(uri => URI.is.Artist(uri), updateArtistPage);
