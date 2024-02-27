import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
import GenresPage from "./pages/top_genres.js";
import LibraryPage from "./pages/library.js";
import ChartsPage from "./pages/charts.js";
import AlbumsPage from "./pages/top_albums.js";
import { STATS_VERSION, LATEST_RELEASE } from "./constants.js";
import { S } from "/modules/std/index.js";
const { React } = S;
const checkForUpdates = (setNewUpdate) => {
    fetch(LATEST_RELEASE)
        .then(res => res.json())
        .then(result => {
        try {
            setNewUpdate(result[0].name.slice(1) !== STATS_VERSION);
        }
        catch (err) {
            console.log(err);
        }
    }, error => {
        console.log("Failed to check for updates", error);
    });
};
export default function () {
    const [config, setConfig] = React.useState({ ...SpicetifyStats.ConfigWrapper.Config });
    const launchModal = () => {
        SpicetifyStats.ConfigWrapper.launchModal(setConfig);
    };
    const configWrapper = {
        config: config,
        launchModal,
    };
    const pages = {
        Artists: S.React.createElement(ArtistsPage, { configWrapper: configWrapper }),
        Tracks: S.React.createElement(TracksPage, { configWrapper: configWrapper }),
        Albums: S.React.createElement(AlbumsPage, { configWrapper: configWrapper }),
        Genres: S.React.createElement(GenresPage, { configWrapper: configWrapper }),
        Library: S.React.createElement(LibraryPage, { configWrapper: configWrapper }),
        Charts: S.React.createElement(ChartsPage, { configWrapper: configWrapper }),
    };
    // const tabPages = ["Artists", "Tracks", "Albums", "Genres", "Library", "Charts"].filter(page => configWrapper.config[`show-${page.toLowerCase()}`]);
    // const [navBar, activeLink, setActiveLink] = useNavigationBar(tabPages);
    // const [hasPageSwitched, setHasPageSwitched] = React.useState(false); // TODO: edit spcr-navigation-bar to include initial active link
    // const [newUpdate, setNewUpdate] = React.useState(false);
    // React.useEffect(() => {
    // 	setActiveLink(storage.getItem("active-link") || "Artists");
    // 	checkForUpdates(setNewUpdate);
    // 	setHasPageSwitched(true);
    // }, []);
    // React.useEffect(() => {
    // 	storage.setItem("active-link", activeLink);
    // }, [activeLink]);
    // if (!hasPageSwitched) {
    // 	return;
    // }
    return (S.React.createElement("div", { id: "stats-app" }, pages["Artists" /* activeLink */]));
}
