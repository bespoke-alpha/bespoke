import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import StatCard from "../components/cards/stat_card.js";
import ContributionChart from "../components/cards/contribution_chart.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import InlineGrid from "../components/inline_grid.js";
import Shelf from "../components/shelf.js";
import { spotifyApi } from "/modules/Delusoire/delulib/api.js";
import { chunkify20, chunkify50 } from "/modules/Delusoire/delulib/fp.js";
import { _, fp } from "/modules/Delusoire/std/deps.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import { getURI, toID } from "../util/parse.js";
const PlaylistAPI = S.Platform.getPlaylistAPI();
export const fetchAudioFeaturesMeta = async (ids) => {
    const featureList = {
        danceability: new Array(),
        energy: new Array(),
        key: new Array(),
        loudness: new Array(),
        mode: new Array(),
        speechiness: new Array(),
        acousticness: new Array(),
        instrumentalness: new Array(),
        liveness: new Array(),
        valence: new Array(),
        tempo: new Array(),
        time_signature: new Array(),
    };
    const audioFeaturess = await chunkify50(chunk => spotifyApi.tracks.audioFeatures(chunk))(ids);
    for (const audioFeatures of audioFeaturess) {
        // ? some songs don't have audioFeatures
        if (!audioFeatures)
            continue;
        for (const f of Object.keys(featureList)) {
            featureList[f].push(audioFeatures[f]);
        }
    }
    return _.mapValues(featureList, fp.mean);
};
export const calculateGenresFromArtists = (artists, getArtistMultiplicity) => {
    const genres = {};
    artists.forEach((artist, i) => {
        for (const genre of artist.genres) {
            genres[genre] ??= 0;
            genres[genre] += getArtistMultiplicity(i);
        }
    });
    return genres;
};
export const fetchArtistsMeta = async (ids) => {
    const idToMult = _(ids)
        .groupBy(_.identity)
        .mapValues(ids => ids.length)
        .value();
    const uniqIds = _.uniq(ids);
    const artistsRes = await chunkify50(chunk => spotifyApi.artists.get(chunk))(uniqIds);
    const artists = artistsRes.map(artist => ({
        name: artist.name,
        uri: artist.uri,
        image: artist.images.at(-1)?.url ?? DEFAULT_TRACK_IMG,
        multiplicity: idToMult[artist.id],
    }));
    const genres = calculateGenresFromArtists(artistsRes, i => artists[i].multiplicity);
    return { artists, genres };
};
export const fetchAlbumsMeta = async (ids) => {
    const idToMult = _(ids)
        .groupBy(_.identity)
        .mapValues(ids => ids.length)
        .value();
    const uniqIds = _.uniq(ids);
    const albumsRes = await chunkify20(chunk => spotifyApi.albums.get(chunk))(uniqIds);
    const releaseYears = {};
    const albums = albumsRes.map(album => {
        const multiplicity = idToMult[album.id];
        const releaseYear = new Date(album.release_date).getFullYear();
        releaseYears[releaseYear] ??= 0;
        releaseYears[releaseYear] += multiplicity;
        return {
            name: album.name,
            uri: album.uri,
            image: album.images.at(-1)?.url ?? DEFAULT_TRACK_IMG,
            releaseYear,
            multiplicity,
        };
    });
    return { albums, releaseYears };
};
const PlaylistPage = ({ uri }) => {
    const queryFn = async () => {
        const playlist = await PlaylistAPI.getPlaylist(uri);
        const { metadata, contents } = playlist;
        const tracks = contents.items;
        const duration = tracks.map(track => track.duration.milliseconds).reduce(fp.add);
        const trackURIs = tracks.map(getURI);
        const trackIDs = trackURIs.map(toID);
        const audioFeatures = await fetchAudioFeaturesMeta(trackIDs);
        const artistObjs = tracks.flatMap(track => track.artists);
        const artistURIs = artistObjs.map(getURI);
        const artistIDs = artistURIs.map(toID);
        const { artists, genres } = await fetchArtistsMeta(artistIDs);
        const albumObjs = tracks.map(track => track.album);
        const albumURIs = albumObjs.map(getURI);
        const albumIDs = albumURIs.map(toID);
        const { albums, releaseYears } = await fetchAlbumsMeta(albumIDs);
        return { tracks, duration, audioFeatures, artists, genres, albums, releaseYears };
    };
    const { isLoading, error, data } = S.ReactQuery.useQuery({
        queryKey: ["playlistAnalysis"],
        queryFn,
    });
    if (isLoading) {
        return "Loading";
    }
    if (error) {
        console.error("SOS", error);
        return "Error";
    }
    if (!data) {
        return "WTF";
    }
    const { audioFeatures, artists, tracks, duration, genres, albums, releaseYears } = data;
    const statCards = Object.entries(audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = artists.map(artist => {
        return (S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.multiplicity} tracks`, imageUrl: artist.image }));
    });
    const albumCards = albums.map(album => {
        return (S.React.createElement(SpotifyCard, { type: "album", uri: album.uri, header: album.name, subheader: `Appears in ${album.multiplicity} tracks`, imageUrl: album.image }));
    });
    return (S.React.createElement("div", { className: "page-content encore-dark-theme encore-base-set" },
        S.React.createElement("section", { className: "stats-libraryOverview" },
            S.React.createElement(StatCard, { label: "Total Tracks", value: tracks.length }),
            S.React.createElement(StatCard, { label: "Total Artists", value: artists.length }),
            S.React.createElement(StatCard, { label: "Total Minutes", value: Math.floor(duration / 60) }),
            S.React.createElement(StatCard, { label: "Total Hours", value: duration / 60 / 60 })),
        S.React.createElement(Shelf, { title: "Most Frequent Genres" },
            S.React.createElement(ContributionChart, { contributions: genres }),
            S.React.createElement(InlineGrid, { special: true }, statCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Artists" },
            S.React.createElement(InlineGrid, null, artistCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Albums" },
            S.React.createElement(InlineGrid, null, albumCards)),
        S.React.createElement(Shelf, { title: "Release Year Distribution" },
            S.React.createElement(ContributionChart, { contributions: releaseYears }))));
};
export default React.memo(PlaylistPage);
