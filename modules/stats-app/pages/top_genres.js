import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import StatCard from "../components/cards/stat_card.js";
import GenresCard from "../components/cards/genres_card.js";
import InlineGrid from "../components/inline_grid.js";
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import Tracklist from "../components/tracklist.js";
import Shelf from "../components/shelf.js";
import { topArtistsReq } from "./top_artists.js";
import { topTracksReq } from "./top_tracks.js";
import { apiRequest, fetchAudioFeatures, updatePageCache } from "../funcs.js";
import { SPOTIFY } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";
const DropdownOptions = [
    { id: "short_term", name: "Past Month" },
    { id: "medium_term", name: "Past 6 Months" },
    { id: "long_term", name: "All Time" },
];
const GenresPage = () => {
    const [topGenres, setTopGenres] = React.useState(100);
    const [dropdown, activeOption] = useDropdownMenu(DropdownOptions, "top-genres");
    const fetchTopGenres = async (time_range, force, set = true, force_refetch) => {
        if (!force) {
            const storedData = storage.getItem(`top-genres:${time_range}`);
            if (storedData)
                return setTopGenres(JSON.parse(storedData));
        }
        const start = window.performance.now();
        const cacheInfo = JSON.parse(storage.getItem("cache-info"));
        const fetchedItems = await Promise.all(["artists", "tracks"].map(async (type, index) => {
            if (cacheInfo[index] === true && !force_refetch) {
                return await JSON.parse(storage.getItem(`top-${type}:${time_range}`));
            }
            const fetchedItems = await (type === "artists" ? topArtistsReq(time_range) : topTracksReq(time_range));
            cacheInfo[index] = true;
            cacheInfo[2] = true;
            storage.setItem(`top-${type}:${time_range}`, JSON.stringify(fetchedItems));
            storage.setItem("cache-info", JSON.stringify(cacheInfo));
            return fetchedItems;
        }));
        for (let i = 0; i < 2; i++) {
            if (fetchedItems[i] === 200 || fetchedItems[i] === 300)
                return setTopGenres(fetchedItems[i]);
        }
        const fetchedArtists = fetchedItems[0].filter((artist) => artist?.genres);
        const fetchedTracks = fetchedItems[1].filter((track) => track?.id);
        const genres = fetchedArtists.reduce((acc, artist) => {
            for (const genre of artist.genres) {
                const index = acc.findIndex(([g]) => g === genre);
                if (index !== -1) {
                    acc[index][1] += 1 * Math.abs(fetchedArtists.indexOf(artist) - 50);
                }
                else {
                    acc.push([genre, 1 * Math.abs(fetchedArtists.indexOf(artist) - 50)]);
                }
            }
            return acc;
        }, []);
        let trackPopularity = 0;
        let explicitness = 0;
        const releaseData = [];
        const topTracks = fetchedTracks.map((track) => {
            trackPopularity += track.popularity;
            if (track.explicit)
                explicitness++;
            if (track.release_year) {
                const year = track.release_year;
                const index = releaseData.findIndex(([y]) => y === year);
                if (index !== -1) {
                    releaseData[index][1] += 1;
                }
                else {
                    releaseData.push([year, 1]);
                }
            }
            return track.id;
        });
        async function testDupe(track) {
            // perform a search to get rid of duplicate tracks
            const spotifyItem = await apiRequest("track", SPOTIFY.search(track.name, track.artists[0].name), 1, false).then((res) => res.tracks?.items);
            if (!spotifyItem)
                return false;
            return spotifyItem.some((item) => {
                return item.name === track.name && item.popularity > track.popularity;
            });
        }
        let obscureTracks = [];
        for (let i = 0; i < fetchedTracks.length; i++) {
            const track = fetchedTracks[i];
            if (!track?.popularity)
                continue;
            if (obscureTracks.length < 5) {
                const dupe = await testDupe(track);
                if (dupe)
                    continue;
                obscureTracks.push(track);
                obscureTracks.sort((a, b) => b.popularity - a.popularity);
                continue;
            }
            for (let j = 0; j < 5; j++) {
                if (track.popularity < obscureTracks[j].popularity) {
                    const dupe = await testDupe(track);
                    if (dupe)
                        break;
                    obscureTracks.splice(j, 0, track);
                    obscureTracks = obscureTracks.slice(0, 5);
                    break;
                }
            }
        }
        const fetchedFeatures = await fetchAudioFeatures(topTracks);
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
            popularity: trackPopularity,
            explicitness,
            ...audioFeatures,
        };
        for (const key in audioFeatures) {
            audioFeatures[key] = audioFeatures[key] / 50;
        }
        console.log("total genres fetch time:", window.performance.now() - start);
        if (set)
            setTopGenres({
                genres: genres,
                features: audioFeatures,
                years: releaseData,
                obscureTracks: obscureTracks,
            });
        storage.setItem(`top-genres:${time_range}`, JSON.stringify({
            genres: genres,
            features: audioFeatures,
            years: releaseData,
            obscureTracks: obscureTracks,
        }));
    };
    React.useEffect(() => {
        updatePageCache(2, fetchTopGenres, activeOption.id);
    }, []);
    React.useEffect(() => {
        fetchTopGenres(activeOption.id);
    }, [activeOption]);
    const refresh = () => {
        fetchTopGenres(activeOption.id, true);
    };
    const props = {
        title: "Top Genres",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { callback: refresh }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    switch (topGenres) {
        case 300:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "No API Key or Username", subheading: "Please enter these in the settings menu" })));
        case 200:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "error", heading: "Failed to Fetch Top Genres", subheading: "An error occurred while fetching the data" })));
        case 100:
            return (S.React.createElement(PageContainer, { ...props },
                S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "Fetching data..." })));
    }
    const statCards = Object.entries(topGenres.features).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const obscureTracks = topGenres.obscureTracks.map((track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index + 1, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.image, isExplicit: track.explicit, albumOrShow: { type: "album", name: track.album, uri: track.album_uri }, isOwnedBySelf: track.liked, duration_ms: track.duration })));
    return (S.React.createElement(PageContainer, { ...props },
        S.React.createElement("section", { className: "QyANtc_r7ff_tqrf5Bvc Shelf" },
            S.React.createElement(GenresCard, { genres: topGenres.genres, total: 1275 }),
            S.React.createElement(InlineGrid, { special: true }, statCards)),
        S.React.createElement(Shelf, { title: "Release Year Distribution" },
            S.React.createElement(GenresCard, { genres: topGenres.years, total: 50 })),
        S.React.createElement(Shelf, { title: "Most Obscure Tracks" },
            S.React.createElement(Tracklist, { minified: true }, obscureTracks))));
};
export default React.memo(GenresPage);
