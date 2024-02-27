import { S } from "/modules/std/index.js";
const { React, URI } = S;
import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import StatCard from "../components/cards/stat_card.js";
import GenresCard from "../components/cards/genres_card.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import InlineGrid from "../components/inline_grid.js";
import { apiRequest, updatePageCache, fetchAudioFeatures, fetchTopAlbums, fetchTopArtists } from "../funcs.js";
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import Shelf from "../components/shelf.js";
import { SPOTIFY } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
const DropdownOptions = [
    { id: "owned", name: "My Playlists" },
    { id: "all", name: "All Playlists" },
];
const LibraryPage = ({ configWrapper }) => {
    const [library, setLibrary] = React.useState(100);
    const [dropdown, activeOption, setActiveOption] = useDropdownMenu(DropdownOptions, "stats:library");
    const fetchData = async (option, force, set = true) => {
        try {
            if (!force) {
                const storedData = storage.getItem(`library:${option}`);
                if (storedData)
                    return setLibrary(JSON.parse(storedData));
            }
            const start = window.performance.now();
            // fetch all rootlist items
            const rootlistItems = await apiRequest("rootlist", SPOTIFY.rootlist);
            // flatten rootlist into playlists
            const flattenPlaylists = (items) => {
                const playlists = [];
                for (const row of items) {
                    if (row.type === "playlist") {
                        // add the playlist to the result list
                        playlists.push(row);
                    }
                    else if (row.type === "folder") {
                        // recursively flatten playlists in the folder
                        if (!row.rows)
                            return;
                        const folderPlaylists = flattenPlaylists(row.rows);
                        // add the flattened playlists to the result list
                        playlists.push(...folderPlaylists);
                    }
                }
                return playlists;
            };
            let playlists = flattenPlaylists(rootlistItems?.rows);
            playlists = playlists.sort((a, b) => (a.ownedBySelf === b.ownedBySelf ? 0 : a.ownedBySelf ? -1 : 1));
            let indexOfFirstNotOwned = -1;
            const playlistUris = new Array();
            let trackCount = 0;
            let ownedTrackCount = 0;
            for (const playlist of playlists) {
                if (playlist.totalLength === 0)
                    return;
                if (!playlist.ownedBySelf && indexOfFirstNotOwned === -1)
                    indexOfFirstNotOwned = playlistUris.length;
                playlistUris.push(playlist.link);
                trackCount += playlist.totalLength;
                if (playlist.ownedBySelf)
                    ownedTrackCount += playlist.totalLength;
            }
            // fetch all playlist tracks
            const playlistsMeta = await Promise.all(playlistUris.map((uri) => {
                return apiRequest("playlistsMetadata", SPOTIFY.playlist(uri), 5, false);
            }));
            let duration = 0;
            const trackIDs = new Array();
            let popularity = 0;
            const albums = {};
            const artists = {};
            let explicitCount = 0;
            let ownedDuration = 0;
            let ownedArtists = {};
            let ownedPopularity = 0;
            let ownedAlbums = {};
            let ownedExplicitCount = 0;
            // loop through all playlists, add up total duration and obscurity, seperate track ids and artists
            for (let i = 0; i < playlistsMeta.length; i++) {
                const playlist = playlistsMeta[i];
                if (!playlist)
                    continue;
                if (i === indexOfFirstNotOwned) {
                    ownedDuration = duration;
                    ownedArtists = Object.assign({}, artists);
                    ownedPopularity = popularity;
                    ownedExplicitCount = explicitCount;
                    ownedAlbums = Object.assign({}, albums);
                }
                duration += playlist.playlist.duration;
                for (const track of playlist.items) {
                    if (!track?.album)
                        return;
                    if (track.link.includes("local"))
                        return;
                    trackIDs.push(track.link.split(":")[2]);
                    if (track.isExplicit)
                        explicitCount++;
                    popularity += track.popularity;
                    const albumID = track.album.link.split(":")[2];
                    albums[albumID] = albums[albumID] ? albums[albumID] + 1 : 1;
                    for (const artist of track.artists) {
                        const artistID = URI.fromString(artist.link).id;
                        artists[artistID] = artists[artistID] ? artists[artistID] + 1 : 1;
                    }
                }
            }
            const [topArtists, topGenres, topGenresTotal] = await fetchTopArtists(artists);
            const [ownedTopArtists, ownedTopGenres, ownedTopGenresTotal] = await fetchTopArtists(ownedArtists);
            const [topAlbums, releaseYears, releaseYearsTotal] = await fetchTopAlbums(albums);
            const [ownedTopAlbums, ownedReleaseYears, ownedReleaseYearsTotal] = await fetchTopAlbums(ownedAlbums, topAlbums);
            const fetchedFeatures = await fetchAudioFeatures(trackIDs);
            const audioFeatures = {
                danceability: 0,
                energy: 0,
                valence: 0,
                speechiness: 0,
                acousticness: 0,
                instrumentalness: 0,
                liveness: 0,
                tempo: 0,
            };
            let ownedAudioFeatures = {};
            for (let i = 0; i < fetchedFeatures.length; i++) {
                if (i === ownedTrackCount) {
                    ownedAudioFeatures = {
                        popularity: ownedPopularity,
                        explicitness: ownedExplicitCount,
                        ...audioFeatures,
                    };
                }
                if (!fetchedFeatures[i])
                    continue;
                const track = fetchedFeatures[i];
                for (const feature in Object.keys(audioFeatures)) {
                    audioFeatures[feature] += track[feature];
                }
            }
            const allAudioFeatures = {
                popularity,
                explicitness: explicitCount,
                ...audioFeatures,
            };
            for (const key in allAudioFeatures) {
                allAudioFeatures[key] /= fetchedFeatures.length;
            }
            for (const key in ownedAudioFeatures) {
                ownedAudioFeatures[key] /= ownedTrackCount;
            }
            const ownedStats = {
                audioFeatures: ownedAudioFeatures,
                trackCount: ownedTrackCount,
                totalDuration: ownedDuration,
                artists: ownedTopArtists,
                artistCount: Object.keys(ownedArtists).length,
                genres: ownedTopGenres,
                genresDenominator: ownedTopGenresTotal,
                playlistCount: indexOfFirstNotOwned > 0 ? indexOfFirstNotOwned : 0,
                albums: ownedTopAlbums,
                years: ownedReleaseYears,
                yearsDenominator: ownedReleaseYearsTotal,
            };
            const allStats = {
                playlistCount: playlists.length,
                audioFeatures: allAudioFeatures,
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
            if (set) {
                if (option === "all" && allStats.playlistCount)
                    setLibrary(allStats);
                else if (option === "owned" && ownedStats.playlistCount)
                    setLibrary(ownedStats);
                else
                    return setLibrary(300);
            }
            storage.setItem("library:all", JSON.stringify(allStats));
            storage.setItem("library:owned", JSON.stringify(ownedStats));
            console.log("total library fetch time:", window.performance.now() - start);
        }
        catch (e) {
            console.error(e);
            setLibrary(200);
        }
    };
    React.useEffect(() => {
        updatePageCache(3, fetchData, activeOption.id, true);
    }, []);
    React.useEffect(() => {
        fetchData(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchData(activeOption.id, true);
    };
    const props = {
        title: "Library Analysis",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { configWrapper: configWrapper })],
    };
    switch (library) {
        case 300:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "No Playlists In Your Library", subheading: "Try adding some playlists first" })));
        case 200:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "Failed to Fetch Stats", subheading: "Make an issue on Github" })));
        case 100:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "library", heading: "Analysing your Library", subheading: "This may take a while" })));
    }
    const statCards = Object.entries(library.audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = library.artists.slice(0, 10).map(artist => {
        return S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.freq} tracks`, imageUrl: artist.image });
    });
    const albumCards = library.albums.map(album => {
        return S.React.createElement(SpotifyCard, { type: "album", uri: album.uri, header: album.name, subheader: `Appears in ${album.freq} tracks`, imageUrl: album.image });
    });
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("section", { className: "stats-libraryOverview" },
            S.React.createElement(StatCard, { label: "Total Playlists", value: library.playlistCount.toString() }),
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
export default React.memo(LibraryPage);
