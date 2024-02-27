import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
import GenresPage from "./pages/top_genres.js";
import LibraryPage from "./pages/library.js";
import ChartsPage from "./pages/charts.js";
import AlbumsPage from "./pages/top_albums.js";
import { STATS_VERSION, LATEST_RELEASE } from "./constants.js";

import { S } from "/modules/std/index.js";

import { storage } from "./index.js";

const { React } = S;

const checkForUpdates = (setNewUpdate: (a: boolean) => void) => {
	fetch(LATEST_RELEASE)
		.then(res => res.json())
		.then(
			result => {
				try {
					setNewUpdate(result[0].name.slice(1) !== STATS_VERSION);
				} catch (err) {
					console.log(err);
				}
			},
			error => {
				console.log("Failed to check for updates", error);
			},
		);
};

export default function () {
	console.log("HOLY MOLY");

	const pages: Record<string, React.ReactElement> = {
		Artists: <ArtistsPage />,
		Tracks: <TracksPage />,
		Albums: <AlbumsPage />,
		Genres: <GenresPage />,
		Library: <LibraryPage />,
		Charts: <ChartsPage />,
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

	return (
		<div id="stats-app">
			{/* {navBar} */}
			{/* {newUpdate && (
				<div className="new-update">
					New app update available! Visit <a href="https://github.com/harbassan/spicetify-stats/releases">harbassan/spicetify-stats</a> to install.
				</div>
			)} */}
			{pages["Artists" /* activeLink */]}
		</div>
	);
}