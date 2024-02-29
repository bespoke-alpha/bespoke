import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import useDropdown from "../components/dropdown/useDropdownMenu.js";
import StatCard from "../components/cards/stat_card.js";
import ContributionChart from "../components/cards/contribution_chart.js";
import InlineGrid from "../components/inline_grid.js";
import PageContainer from "../components/shared/page_container.js";
import Shelf from "../components/shelf.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../components/buttons/settings_button.js";
import { fetchTopTracks } from "./top_tracks.js";
import { fetchTopArtists } from "./top_artists.js";
import { calculateGenresFromArtists, fetchAudioFeaturesMeta } from "./playlist.js";
import { getURI, toID } from "../util/parse.js";
import { SpotifyTimeRange } from "../api/spotify.js";
import { DEFAULT_TRACK_IMG } from "../static.js";
import Status from "../components/shared/status.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": SpotifyTimeRange.Short,
    "Past 6 Months": SpotifyTimeRange.Medium,
    "All Time": SpotifyTimeRange.Long,
};
const columns = ["INDEX", "TITLE_AND_ARTIST", "ALBUM", "DURATION"];
const allowedDropTypes = [];
export const calculateTracksMeta = (tracks) => {
    let explicitCount = 0;
    let popularityTotal = 0;
    const releaseDates = {};
    for (const track of tracks) {
        track.explicit && explicitCount++;
        popularityTotal += track.popularity;
        const releaseDate = new Date(track.album.release_date).getFullYear();
        releaseDates[releaseDate] ??= 0;
        releaseDates[releaseDate]++;
    }
    const obscureTracks = tracks.toSorted((a, b) => a.popularity - b.popularity).slice(0, 5);
    return { explicitness: explicitCount / tracks.length, popularity: popularityTotal / tracks.length, releaseDates, obscureTracks };
};
const GenresPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-genres");
    const timeRange = OptionToTimeRange[activeOption];
    const { status, error, data, refetch } = S.ReactQuery.useQuery({
        queryKey: ["topGenres", timeRange],
        queryFn: async () => {
            const topTracks = await fetchTopTracks(timeRange);
            const topArtists = await fetchTopArtists(timeRange);
            const tracks = topTracks.items;
            const artists = topArtists.items;
            // ! very unscientific
            const genres = calculateGenresFromArtists(artists, i => artists.length - i);
            const trackURIs = tracks.map(getURI);
            const trackIDs = trackURIs.map(toID);
            const audioFeatures = await fetchAudioFeaturesMeta(trackIDs);
            const { explicitness, releaseDates, obscureTracks, popularity } = calculateTracksMeta(tracks);
            return {
                genres,
                releaseDates,
                obscureTracks,
                audioFeatures: Object.assign(audioFeatures, {
                    popularity,
                    explicitness,
                }),
            };
        },
    });
    const thisRef = React.useRef(null);
    const { usePlayContextItem } = S.getPlayContext({ uri: "" }, { featureIdentifier: "queue" });
    switch (status) {
        case "pending": {
            return S.React.createElement(Status, { icon: "library", heading: "Loading", subheading: "This operation is taking longer than expected." });
        }
        case "error": {
            // TODO: use module's logger
            console.error(error);
            return S.React.createElement(Status, { icon: "error", heading: "Problem occured", subheading: "Please make sure that all your settings are valid." });
        }
    }
    const { genres, releaseDates, obscureTracks, audioFeatures } = data;
    const PageContainerProps = {
        title: "Top Genres",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), S.React.createElement(SettingsButton, { section: "Statistics" })],
    };
    const statsCards = Object.entries(audioFeatures).map(([key, value]) => S.React.createElement(StatCard, { label: key, value: value }));
    return (S.React.createElement(PageContainer, { ...PageContainerProps },
        S.React.createElement("section", { className: "QyANtc_r7ff_tqrf5Bvc Shelf" },
            S.React.createElement(ContributionChart, { contributions: genres }),
            S.React.createElement(InlineGrid, { special: true }, statsCards)),
        S.React.createElement(Shelf, { title: "Release Year Distribution" },
            S.React.createElement(ContributionChart, { contributions: releaseDates })),
        S.React.createElement(Shelf, { title: "Most Obscure Tracks" },
            S.React.createElement(S.ReactComponents.TracklistColumnsContextProvider, { columns: columns },
                S.React.createElement(S.ReactComponents.Tracklist, { ariaLabel: "Top Tracks", hasHeaderRow: false, columns: columns, renderRow: (track, index) => (S.React.createElement(S.ReactComponents.TracklistRow, { index: index, uri: track.uri, name: track.name, artists: track.artists, imgUrl: track.album.images.at(-1)?.url ?? DEFAULT_TRACK_IMG, isExplicit: track.explicit, albumOrShow: track.album, duration_ms: track.duration_ms, usePlayContextItem: usePlayContextItem, allowedDropTypes: allowedDropTypes })), resolveItem: track => ({ uri: track.uri }), nrTracks: obscureTracks.length, fetchTracks: (offset, limit) => obscureTracks.slice(offset, offset + limit), limit: 5, outerRef: thisRef, tracks: obscureTracks, isCompactMode: false, columnPersistenceKey: "stats-top-genres" }, "spotify:app:stats:genres")))));
};
export default React.memo(GenresPage);
