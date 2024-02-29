import { S } from "/modules/std/index.js";
const { React } = S;

import StatCard from "../components/cards/stat_card.js";
import GenresCard from "../components/cards/genres_card.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import Status from "../shared/components/status.js";
import InlineGrid from "../components/inline_grid.js";
import Shelf from "../components/shelf.js";
import { spotifyApi } from "../../delulib/api.js";
import { chunkify50 } from "../../delulib/fp.js";
import { _, fp } from "../../std/deps.js";
import { URIClass } from "../../std/expose/webpack.js";
import { DEFAULT_TRACK_IMG } from "../static.js";

const PlaylistAPI = S.Platform.getPlaylistAPI();

const { URI } = S;

const fetchAudioFeaturesMeta = async (ids: string[]) => {
	const featureList = {
		danceability: new Array<number>(),
		energy: new Array<number>(),
		key: new Array<number>(),
		loudness: new Array<number>(),
		mode: new Array<number>(),
		speechiness: new Array<number>(),
		acousticness: new Array<number>(),
		instrumentalness: new Array<number>(),
		liveness: new Array<number>(),
		valence: new Array<number>(),
		tempo: new Array<number>(),
		time_signature: new Array<number>(),
	};
	const audioFeaturess = await chunkify50(chunk => spotifyApi.tracks.audioFeatures(chunk))(ids);

	for (const audioFeatures of audioFeaturess) {
		for (const f of Object.keys(featureList)) {
			featureList[f].push(audioFeatures[f]);
		}
	}

	return _.mapValues(featureList, fp.mean);
};

const fetchArtistsMeta = async (ids: string[]) => {
	const idToMult = _(ids)
		.groupBy(_.identity)
		.mapValues(ids => ids.length)
		.value();
	const uniqIds = _.uniq(ids);
	const artistsRes = await chunkify50(chunk => spotifyApi.artists.get(chunk))(uniqIds);
	const genres = {} as Record<string, number>;
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

const fetchAlbumsMeta = async (ids: string[]) => {
	const idToMult = _(ids)
		.groupBy(_.identity)
		.mapValues(ids => ids.length)
		.value();
	const uniqIds = _.uniq(ids);
	const albumsRes = await chunkify50(chunk => spotifyApi.albums.get(chunk))(uniqIds);
	const releaseYears = {} as Record<string, number>;
	const albums = albumsRes.map(album => {
		const multiplicity = idToMult[album.id];

		const releaseYear = new Date(album.release_date).getYear() + 1900;

		releaseYears[releaseYear] ??= 0;
		releaseYears[releaseYear] += multiplicity;

		return {
			name: album.name,
			uri: album.uri,
			image: album.images.at(-1).url ?? DEFAULT_TRACK_IMG,
			releaseYear,
			multiplicity,
		};
	});

	return { albums, releaseYears };
};

const PlaylistPage = ({ uri }: { uri: string }) => {
	const queryFn = async () => {
		const playlist = await PlaylistAPI.getPlaylist(uri);
		const { metadata, contents } = playlist;

		const getURI = ({ uri }) => uri as string;
		const toID = (uri: URIClass<any>) => URI.fromString(uri).id as string;

		const tracks = contents.items as any[];
		const duration = tracks.map(track => track.duration.milliseconds as number).reduce(fp.add);

		const trackURIs = tracks.map(getURI);
		const trackIDs = trackURIs.map(toID);
		const audioFeatures = await fetchAudioFeaturesMeta(trackIDs);

		const artistObjs = tracks.flatMap(track => track.artists as any[]);
		const artistURIs = artistObjs.map(getURI);
		const artistIDs = artistURIs.map(toID);
		const { artists, genres } = await fetchArtistsMeta(artistIDs);

		const albumObjs = tracks.map(track => track.album);
		const albumURIs = albumObjs.map(getURI);
		const albumIDs = albumURIs.map(toID);
		const { albums, releaseYears } = await fetchAlbumsMeta(albumIDs);

		return { tracks, duration, audioFeatures, artists, genres, albums, releaseYears } as const;
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
		return <StatCard label={key} value={value} />;
	});

	const artistCards = artists.map(artist => {
		return (
			<SpotifyCard
				type="artist"
				uri={artist.uri}
				header={artist.name}
				subheader={`Appears in ${artist.multiplicity} tracks`}
				imageUrl={artist.image}
			/>
		);
	});

	const albumCards = albums.map(album => {
		return (
			<SpotifyCard type="album" uri={album.uri} header={album.name} subheader={`Appears in ${album.multiplicity} tracks`} imageUrl={album.image} />
		);
	});

	return (
		<div className="page-content encore-dark-theme encore-base-set">
			<section className="stats-libraryOverview">
				<StatCard label="Total Tracks" value={tracks.length} />
				<StatCard label="Total Artists" value={artists.length} />
				<StatCard label="Total Minutes" value={Math.floor(duration / 60)} />
				<StatCard label="Total Hours" value={duration / 60 / 60} />
			</section>
			<Shelf title="Most Frequent Genres">
				<GenresCard genres={genres} />
				<InlineGrid special>{statCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Artists">
				<InlineGrid>{artistCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Albums">
				<InlineGrid>{albumCards}</InlineGrid>
			</Shelf>
			<Shelf title="Release Year Distribution">
				<GenresCard genres={releaseYears} />
			</Shelf>
		</div>
	);
};

export default React.memo(PlaylistPage);
