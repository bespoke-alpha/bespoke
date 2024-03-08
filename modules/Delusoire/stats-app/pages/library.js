import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
import useDropdown from "../components/dropdown/useDropdown.js";
import StatCard from "../components/cards/stat_card.js";
import ContributionChart from "../components/cards/contribution_chart.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import InlineGrid from "../components/inline_grid.js";
import PageContainer from "../components/shared/page_container.js";
import Shelf from "../components/shelf.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import { SpotifyTimeRange } from "../api/spotify.js";
import { getTracksFromURIs } from "/modules/Delusoire/library-db/db.js";
import { PlaylistItems, SavedPlaylists } from "/modules/Delusoire/library-db/listeners.js";
import { fp } from "/modules/Delusoire/std/deps.js";
import { fetchAlbumsMeta, fetchArtistsMeta, fetchAudioFeaturesMeta } from "./playlist.js";
import { calculateTracksMeta } from "./top_genres.js";
import { getURI, toID } from "../util/parse.js";
import { useStatus } from "../components/status/useStatus.js";
import { logger, settingsButton } from "../index.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": SpotifyTimeRange.Short,
    "Past 6 Months": SpotifyTimeRange.Medium,
    "All Time": SpotifyTimeRange.Long,
};
const LibraryPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-genres");
    const timeRange = OptionToTimeRange[activeOption];
    const { error, data, refetch, status } = S.ReactQuery.useQuery({
        queryKey: ["libraryAnaysis", timeRange],
        queryFn: async () => {
            const trackURIsInLibrary = Array.from(PlaylistItems)
                .map(([k, v]) => v.size && k)
                .filter(Boolean);
            const tracks = await getTracksFromURIs(trackURIsInLibrary);
            const duration = tracks.map(track => track.duration_ms).reduce(fp.add);
            const { explicitness, obscureTracks, popularity, releaseDates } = calculateTracksMeta(tracks);
            const trackURIs = tracks.map(getURI);
            const trackIDs = trackURIs.map(toID);
            const audioFeatures = fetchAudioFeaturesMeta(trackIDs);
            const albumIDs = tracks.map(track => track.album.id);
            const artistIDs = tracks.flatMap(track => track.artists.map(artist => artist.id));
            const { albums } = await fetchAlbumsMeta(albumIDs);
            const { artists, genres } = await fetchArtistsMeta(artistIDs);
            const playlists = Array.from(SavedPlaylists.keys());
            return {
                duration,
                releaseDates,
                playlists,
                genres,
                tracks,
                albums,
                artists,
                audioFeatures: Object.assign(audioFeatures, {
                    explicitness,
                    popularity,
                }),
            };
        },
    });
    const Status = useStatus({ status, error, logger });
    if (Status) {
        return Status;
    }
    const { genres, artists, albums, playlists, duration, releaseDates, tracks, audioFeatures } = data;
    const PageContainerProps = {
        title: "Library Analysis",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), settingsButton],
    };
    const statCards = Object.entries(audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = artists.slice(0, 10).map(artist => {
        return (S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.multiplicity} tracks`, imageUrl: artist.image }));
    });
    const albumCards = albums.map(album => {
        return (S.React.createElement(SpotifyCard, { type: "album", uri: album.uri, header: album.name, subheader: `Appears in ${album.multiplicity} tracks`, imageUrl: album.image }));
    });
    return (S.React.createElement(PageContainer, { ...PageContainerProps },
        S.React.createElement("section", { className: "stats-libraryOverview" },
            S.React.createElement(StatCard, { label: "Total Playlists", value: playlists.length.toString() }),
            S.React.createElement(StatCard, { label: "Total Tracks", value: tracks.length.toString() }),
            S.React.createElement(StatCard, { label: "Total Artists", value: artists.length.toString() }),
            S.React.createElement(StatCard, { label: "Total Minutes", value: Math.floor(duration / 60).toString() }),
            S.React.createElement(StatCard, { label: "Total Hours", value: (duration / 60 / 60).toFixed(1) })),
        S.React.createElement(Shelf, { title: "Most Frequent Genres" },
            S.React.createElement(ContributionChart, { contributions: genres }),
            S.React.createElement(InlineGrid, { special: true }, statCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Artists" },
            S.React.createElement(InlineGrid, null, artistCards)),
        S.React.createElement(Shelf, { title: "Most Frequent Albums" },
            S.React.createElement(InlineGrid, null, albumCards)),
        S.React.createElement(Shelf, { title: "Release Year Distribution" },
            S.React.createElement(ContributionChart, { contributions: releaseDates }))));
};
export default React.memo(LibraryPage);
