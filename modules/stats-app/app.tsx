import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
// import GenresPage from "./pages/top_genres.js";
// import LibraryPage from "./pages/library.js";
import AlbumsPage from "./pages/top_albums.js";
import { STATS_VERSION, LATEST_RELEASE } from "./static.js";

import { S } from "/modules/std/index.js";

const { React } = S;

const checkForUpdates = () =>
	fetch(LATEST_RELEASE)
		.then(res => res.json())
		.then(result => result[0].name.slice(1) !== STATS_VERSION)
		.catch(err => console.log("Failed to check for updates", err));

const pages = {
	tracks: <TracksPage />,
	artists: <ArtistsPage />,
	albums: <AlbumsPage />,
	// genres: <GenresPage />,
	// library: <LibraryPage />,
};

const Q = ({ to, title, selected, onClick }) => (
	<S.ReactComponents.NavTo replace={true} to={to} tabIndex={-1} onClick={onClick} className="ZWI7JsjzJaR_G8Hy4W6J">
		<S.ReactComponents.Chip selected={selected} selectedColorSet="invertedLight" tabIndex={-1}>
			{title}
		</S.ReactComponents.Chip>
	</S.ReactComponents.NavTo>
);

const NavBar = ({ categories, selectedCategory }) => (
	<div className="fVB_YDdnaDlztX7CcWTA">
		<div className="e179_Eg8r7Ub6yjjxctr contentSpacing">
			<div className="VIeVCUUETJyYPCDpsBif">
				<S.ReactComponents.Scrollable>
					{categories.map(category => (
						<Q to={`spotify:app:stats:${category}`} title={category} selected={category === selectedCategory}>
							{category}
						</Q>
					))}
				</S.ReactComponents.Scrollable>
			</div>
		</div>
	</div>
);

const categories = Object.keys(pages) as Array<keyof typeof pages>;

const Page = ({ selectedCategory }: { selectedCategory: keyof typeof pages }) => pages[selectedCategory];

export default function () {
	const [newUpdate, setNewUpdate] = React.useState(false);

	React.useEffect(() => {
		checkForUpdates().then(newUpdate => setNewUpdate((newUpdate as boolean) ?? false));
	}, []);

	const match = S.useMatch("/stats/:category");
	const selectedCategory = match?.params?.category ?? categories[0];

	return (
		<div id="stats-app">
			<NavBar categories={categories} selectedCategory={selectedCategory} />
			{newUpdate && (
				<div className="new-update">
					New app update available! Visit <a href="https://github.com/harbassan/spicetify-stats/releases">harbassan/spicetify-stats</a> to install.
				</div>
			)}
			<S.ReactComponents.Routes>
				<S.ReactComponents.Route path="/" element={pages[categories[0]]} />
				<S.ReactComponents.Route path=":category" element={<Page selectedCategory={selectedCategory} />} />
			</S.ReactComponents.Routes>
		</div>
	);
}
