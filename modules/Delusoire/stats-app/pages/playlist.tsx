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
import type { Artist } from "@fostertheweb/spotify-web-api-ts-sdk";
import Status from "../components/shared/status.js";

const PlaylistAPI = S.Platform.getPlaylistAPI();

export const fetchAudioFeaturesMeta = async (ids: string[]) => {
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
		// ? some songs don't have audioFeatures
		if (!audioFeatures) continue;
		for (const f of Object.keys(featureList)) {
			featureList[f].push(audioFeatures[f]);
		}
	}

	return _.mapValues(featureList, fp.mean);
};

export const calculateGenresFromArtists = (artists: Artist[], getArtistMultiplicity: (index: number) => number) => {
	const genres = {} as Record<string, number>;
	artists.forEach((artist, i) => {
		for (const genre of artist.genres) {
			genres[genre] ??= 0;
			genres[genre] += getArtistMultiplicity(i);
		}
	});
	return genres;
};

export const fetchArtistsMeta = async (ids: string[]) => {
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

export const fetchAlbumsMeta = async (ids: string[]) => {
	const idToMult = _(ids)
		.groupBy(_.identity)
		.mapValues(ids => ids.length)
		.value();
	const uniqIds = _.uniq(ids);
	const albumsRes = await chunkify20(chunk => spotifyApi.albums.get(chunk))(uniqIds);
	const releaseYears = {} as Record<string, number>;
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

const PlaylistPage = ({ uri }: { uri: string }) => {
	const queryFn = async () => {
		const playlist = await PlaylistAPI.getPlaylist(uri);
		const { metadata, contents } = playlist;

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

	const { status, error, data } = S.ReactQuery.useQuery({
		queryKey: ["playlistAnalysis"],
		queryFn,
	});

	switch (status) {
		case "pending": {
			return <Status icon="library" heading="Loading" subheading="This operation is taking longer than expected." />;
		}
		case "error": {
			// TODO: use module's logger
			console.error(error);
			return <Status icon="error" heading="Problem occured" subheading="Please make sure that all your settings are valid." />;
		}
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
				<ContributionChart contributions={genres} />
				<InlineGrid special>{statCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Artists">
				<InlineGrid>{artistCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Albums">
				<InlineGrid>{albumCards}</InlineGrid>
			</Shelf>
			<Shelf title="Release Year Distribution">
				<ContributionChart contributions={releaseYears} />
			</Shelf>
		</div>
	);
};

export default React.memo(PlaylistPage);
