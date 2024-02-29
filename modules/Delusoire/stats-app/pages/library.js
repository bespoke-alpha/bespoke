import { S } from "/modules/std/index.js";
const { React } = S;
import useDropdown from "../components/shared/dropdown/useDropdownMenu.js";
import StatCard from "../components/cards/stat_card.js";
import ContributionChart from "../components/cards/contribution_chart.js";
import SpotifyCard from "../components/shared/spotify_card.js";
import InlineGrid from "../components/inline_grid.js";
import PageContainer from "../components/shared/page_container.js";
import Shelf from "../components/shelf.js";
import RefreshButton from "../components/shared/buttons/refresh_button.js";
import SettingsButton from "../components/shared/settings_button.js";
import { SpotifyTimeRange } from "../api/spotify.js";
import { getTracksFromURIs } from "/modules/library-db/db.js";
import { PlaylistItems } from "../../library-db/listeners.js";
import { fp } from "/modules/std/deps.js";
const DropdownOptions = ["Past Month", "Past 6 Months", "All Time"];
const OptionToTimeRange = {
    "Past Month": SpotifyTimeRange.Short,
    "Past 6 Months": SpotifyTimeRange.Medium,
    "All Time": SpotifyTimeRange.Long,
};
const LibraryPage = () => {
    const [dropdown, activeOption] = useDropdown(DropdownOptions, "top-genres");
    const timeRange = OptionToTimeRange[activeOption];
    const { isLoading, error, data, refetch } = S.ReactQuery.useQuery({
        queryKey: ["libraryAnaysis", timeRange],
        queryFn: async () => {
            const trackURIsInLibrary = Object.entries(PlaylistItems)
                .map(([k, v]) => v?.size && k)
                .filter(Boolean);
            const tracksInLibrary = await getTracksFromURIs(trackURIsInLibrary);
            const duration = tracksInLibrary.map(track => track.duration_ms).reduce(fp.add);
            // duration, popularity, albums, artists
        },
    });
    if (isLoading) {
        return "Loading";
    }
    if (error) {
        return "Error";
    }
    const { genres, artists, albums, playlists, duration, releaseDates, tracks, audioFeatures } = data;
    const PageContainerProps = {
        title: "Library Analysis",
        headerEls: [dropdown, S.React.createElement(RefreshButton, { refresh: refetch }), S.React.createElement(SettingsButton, { section: "stats" })],
    };
    const statCards = Object.entries(audioFeatures).map(([key, value]) => {
        return S.React.createElement(StatCard, { label: key, value: value });
    });
    const artistCards = artists.slice(0, 10).map(artist => {
        return S.React.createElement(SpotifyCard, { type: "artist", uri: artist.uri, header: artist.name, subheader: `Appears in ${artist.freq} tracks`, imageUrl: artist.image });
    });
    const albumCards = albums.map(album => {
        return S.React.createElement(SpotifyCard, { type: "album", uri: album.uri, header: album.name, subheader: `Appears in ${album.freq} tracks`, imageUrl: album.image });
    });
    return (S.React.createElement(PageContainer, { ...PageContainerProps },
        S.React.createElement("section", { className: "stats-libraryOverview" },
            S.React.createElement(StatCard, { label: "Total Playlists", value: playlists.length }),
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
            S.React.createElement(ContributionChart, { contributions: releaseDates }))));
};
export default React.memo(LibraryPage);
