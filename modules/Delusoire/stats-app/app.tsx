import ArtistsPage from "./pages/top_artists.js";
import TracksPage from "./pages/top_tracks.js";
import GenresPage from "./pages/top_genres.js";
import LibraryPage from "./pages/library.js";
import AlbumsPage from "./pages/top_albums.js";

import { S } from "/modules/Delusoirestd/index.js";

const Pages = {
	tracks: <TracksPage />,
	artists: <ArtistsPage />,
	albums: <AlbumsPage />,
	genres: <GenresPage />,
	library: <LibraryPage />,
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

const categories = Object.keys(Pages) as Array<keyof typeof Pages>;

const Page = ({ selectedCategory }: { selectedCategory: keyof typeof Pages }) => Pages[selectedCategory];

export default function () {
	const match = S.useMatch("/stats/:category");
	const selectedCategory = match?.params?.category ?? categories[0];

	return (
		<div id="stats-app">
			<NavBar categories={categories} selectedCategory={selectedCategory} />
			<S.ReactComponents.Routes>
				{/* TODO: replace with redirect */}
				<S.ReactComponents.Route path="/" element={Pages[categories[0]]} />
				<S.ReactComponents.Route path=":category" element={<Page selectedCategory={selectedCategory} />} />
			</S.ReactComponents.Routes>
		</div>
	);
}
