import { S } from "/modules/std/index.js";
const { React } = S;
import StatCard from "../components/cards/stat_card.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import { spotifyApi } from "../../delulib/api.js";
import { chunkify50 } from "../../delulib/fp.js";
import { _, fp } from "../../std/deps.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
const PlaylistAPI = S.Platform.getPlaylistAPI();
const { URI } = S;
const fetchAudioFeaturesMeta = async (ids) => {
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
    const audioFeaturess = await chunkify50(spotifyApi.tracks.audioFeatures)(ids);
    for (const audioFeatures of audioFeaturess) {
        for (const f of Object.keys(featureList)) {
            featureList[f].push(audioFeatures[f]);
        }
    }
    return _.mapValues(featureList, fp.mean);
};
const fetchArtistsMeta = async (ids) => {
    const idToMult = _(ids)
        .groupBy(_.identity)
        .mapValues(ids => ids.length)
        .value();
    const uniqIds = _.uniq(ids);
    const artistsRes = await chunkify50(spotifyApi.artists.get)(uniqIds);
    const genres = {};
    const artists = artistsRes.map(artist => {
        const multiplicity = idToMult[artist.id];
        for (const genre of artist.genres) {
            genres[genre] ??= 0;
            genres[genre] += multiplicity;
        }
        return {
            name: artist.name,
            uri: artist.uri,
            image: artist.images.at(-1).url ?? DEFAULT_TRACK_IMG,
            multiplicity,
        };
    });
    return { artists, genres };
};
const PlaylistPage = ({ uri }) => {
    const queryFn = async () => {
        const playlist = await PlaylistAPI.getPlaylist(uri);
        const { metadata, contents } = playlist;
        const tracks = contents.items;
        const trackURIs = tracks.map(item => item.uri);
        const toID = (uri) => URI.fromString(uri).id;
        const duration = tracks.map(track => track.duration.milliseconds).reduce(fp.add);
        const trackIDs = trackURIs.map(toID);
        const audioFeatures = await fetchAudioFeaturesMeta(trackIDs);
        const artistURIs = tracks.map(artist => artist.uri);
        const artistIDs = artistURIs.map(toID);
        const { artists, genres } = await fetchArtistsMeta(artistIDs);
        return { tracks, duration, audioFeatures, artists, genres };
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
    const { audioFeatures, artists, tracks, duration, genres } = data;
    const statCards = Object.entries(audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = artists.map(artist => {
        return (S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.multiplicity} tracks`, imageUrl: artist.image }));
    });
    // const albumCards = albums.map(album => {
    // 	return <SpotifyCard type="album" uri={album.uri} header={album.name} subheader={`Appears in ${album.freq} tracks`} imageUrl={album.image} />;
    // });
    return (S.React.createElement("div", { className: "page-content encore-dark-theme encore-base-set" }));
};
export default React.memo(PlaylistPage);
