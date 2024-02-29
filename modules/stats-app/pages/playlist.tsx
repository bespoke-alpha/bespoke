import { S } from "/modules/std/index.js";
const { React } = S;

import StatCard from "../components/cards/stat_card.js";
import GenresCard from "../components/cards/genres_card.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import Status from "../shared/components/status.js";
import InlineGrid from "../components/inline_grid.js";
import Shelf from "../components/shelf.js";

interface LibraryProps {
	audioFeatures: Record<string, number>;
	trackCount: number;
	totalDuration: number;
	artistCount: number;
	genres: [string, number][];
	genresDenominator: number;
	years: [string, number][];
	yearsDenominator: number;
	artists: ArtistCardProps[];
	albums: Album[];
}

const PlaylistPage = ({ uri }: { uri: string }) => {
	const [library, setLibrary] = React.useState<LibraryProps | 100 | 200>(100);

	const fetchData = async () => {
		const start = window.performance.now();

		const playlistMeta = await apiRequest("playlistMeta", SPOTIFY.playlist(uri));
		if (!playlistMeta) {
			setLibrary(200);
			return;
		}

		const duration = playlistMeta.playlist.duration;
		const trackCount = playlistMeta.playlist.length;
		let explicitCount = 0;
		const trackIDs = new Array<string>();
		let popularity = 0;
		const albums = {} as Record<string, number>;
		const artists = {} as Record<string, number>;

		for (const track of playlistMeta.items) {
			popularity += track.popularity;

			trackIDs.push(track.link.split(":")[2]);

			if (track.isExplicit) explicitCount++;

			const albumID = track.album.link.split(":")[2];
			albums[albumID] = albums[albumID] ? albums[albumID] + 1 : 1;

			for (const artist of track.artists) {
				const artistID = artist.link.split(":")[2];
				artists[artistID] = artists[artistID] ? artists[artistID] + 1 : 1;
			}
		}

		const [topAlbums, releaseYears, releaseYearsTotal] = await fetchTopAlbums(albums);
		const [topArtists, topGenres, topGenresTotal] = await fetchTopArtists(artists);

		const fetchedFeatures = await fetchAudioFeatures(trackIDs);

		let audioFeatures: Record<string, number> = {
			danceability: 0,
			energy: 0,
			valence: 0,
			speechiness: 0,
			acousticness: 0,
			instrumentalness: 0,
			liveness: 0,
			tempo: 0,
		};

		for (let i = 0; i < fetchedFeatures.length; i++) {
			if (!fetchedFeatures[i]) continue;
			const track = fetchedFeatures[i];
			for (const feature of Object.keys(audioFeatures)) {
				audioFeatures[feature] += track[feature];
			}
		}

		audioFeatures = {
			popularity,
			explicitness: explicitCount,
			...audioFeatures,
		};

		for (const key in audioFeatures) {
			audioFeatures[key] /= fetchedFeatures.length;
		}

		const stats = {
			audioFeatures: audioFeatures,
			trackCount: trackCount,
			totalDuration: duration,
			artistCount: Object.keys(artists).length,
			artists: topArtists,
			genres: topGenres,
			genresDenominator: topGenresTotal,
			albums: topAlbums,
			years: releaseYears,
			yearsDenominator: releaseYearsTotal,
		};

		setLibrary(stats);

		console.log("total playlist stats fetch time:", window.performance.now() - start);
	};

	React.useEffect(() => {
		fetchData();
	}, []);

	switch (library) {
		case 200:
			return <Status icon="error" heading="Failed to Fetch Stats" subheading="Make an issue on Github" />;
		case 100:
			return <Status icon="library" heading="Analysing the Playlist" subheading="This may take a while" />;
	}

	const statCards = Object.entries(library.audioFeatures).map(([key, value]) => {
		return <StatCard label={key} value={value} />;
	});

	const artistCards = library.artists.map(artist => {
		return <SpotifyCard type="artist" uri={artist.uri} header={artist.name} subheader={`Appears in ${artist.freq} tracks`} imageUrl={artist.image} />;
	});

	const albumCards = library.albums.map(album => {
		return <SpotifyCard type="album" uri={album.uri} header={album.name} subheader={`Appears in ${album.freq} tracks`} imageUrl={album.image} />;
	});

	return (
		<div className="page-content encore-dark-theme encore-base-set">
			<section className="stats-libraryOverview">
				<StatCard label="Total Tracks" value={library.trackCount.toString()} />
				<StatCard label="Total Artists" value={library.artistCount.toString()} />
				<StatCard label="Total Minutes" value={Math.floor(library.totalDuration / 60).toString()} />
				<StatCard label="Total Hours" value={(library.totalDuration / (60 * 60)).toFixed(1)} />
			</section>
			<Shelf title="Most Frequent Genres">
				<GenresCard genres={library.genres} total={library.genresDenominator} />
				<InlineGrid special>{statCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Artists">
				<InlineGrid>{artistCards}</InlineGrid>
			</Shelf>
			<Shelf title="Most Frequent Albums">
				<InlineGrid>{albumCards}</InlineGrid>
			</Shelf>
			<Shelf title="Release Year Distribution">
				<GenresCard genres={library.years} total={library.yearsDenominator} />
			</Shelf>
		</div>
	);
};

export default React.memo(PlaylistPage);
