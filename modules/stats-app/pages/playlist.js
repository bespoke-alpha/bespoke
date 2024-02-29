import { S } from "/modules/std/index.js";
const { React } = S;
import StatCard from "../components/cards/stat_card.js";
import GenresCard from "../components/cards/genres_card.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import Status from "../shared/components/status.js";
import InlineGrid from "../components/inline_grid.js";
import Shelf from "../components/shelf.js";
const PlaylistPage = ({ uri }) => {
    const [library, setLibrary] = React.useState(100);
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
        const trackIDs = new Array();
        let popularity = 0;
        const albums = {};
        const artists = {};
        for (const track of playlistMeta.items) {
            popularity += track.popularity;
            trackIDs.push(track.link.split(":")[2]);
            if (track.isExplicit)
                explicitCount++;
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
        let audioFeatures = {
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
            if (!fetchedFeatures[i])
                continue;
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
            return S.React.createElement(Status, { icon: "error", heading: "Failed to Fetch Stats", subheading: "Make an issue on Github" });
        case 100:
            return S.React.createElement(Status, { icon: "library", heading: "Analysing the Playlist", subheading: "This may take a while" });
    }
    const statCards = Object.entries(library.audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = library.artists.map(artist => {
        return S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.freq} tracks`, imageUrl: artist.image });
    });
    const albumCards = library.albums.map(album => {
        return S.React.createElement(SpotifyCard, { type: "album", uri: album.uri, header: album.name, subheader: `Appears in ${album.freq} tracks`, imageUrl: album.image });
    });
    return (S.React.createElement("div", { className: "page-content encore-dark-theme encore-base-set" },
        S.React.createElement("section", { className: "stats-libraryOverview" },
            S.React.createElement(StatCard, { label: "Total Tracks", value: library.trackCount.toString() }),
            S.React.createElement(StatCard, { label: "Total Artists", value: library.artistCount.toString() }),
            S.React.createElement(StatCard, { label: "Total Minutes", value: Math.floor(library.totalDuration / 60).toString() }),
            S.React.createElement(StatCard, { label: "Total Hours", value: (library.totalDuration / (60 * 60)).toFixed(1) })),
        S.React.createElement(Shelf, { title: "Most Frequent Genres" },
            S.React.createElement(GenresCard, { genres: library.genres, total: library.genresDenominator }),
            S.React.createElement(InlineGrid, { special: true }, statCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Artists" },
            S.React.createElement(InlineGrid, null, artistCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Albums" },
            S.React.createElement(InlineGrid, null, albumCards)),
        S.React.createElement(Shelf, { title: "Release Year Distribution" },
            S.React.createElement(GenresCard, { genres: library.years, total: library.yearsDenominator }))));
};
export default React.memo(PlaylistPage);
