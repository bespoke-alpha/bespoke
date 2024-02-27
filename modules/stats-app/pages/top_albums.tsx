import { S } from "/modules/std/index.js";
const { React } = S;

import useDropdownMenu from "../shared/dropdown/useDropdownMenu.js";
import SpotifyCard from "../shared/components/spotify_card.js";
import { apiRequest, convertAlbumData, updatePageCache } from "../funcs.js";
import Status from "../shared/components/status.js";
import PageContainer from "../shared/components/page_container.js";
import { Album, ConfigWrapper } from "../types/stats_types.js";
import { LASTFM } from "../endpoints.js";
import RefreshButton from "../components/buttons/refresh_button.js";
import SettingsButton from "../shared/components/settings_button.js";
import { storage } from "../index.js";

export const topAlbumsReq = async (time_range: string, configWrapper: ConfigWrapper) => {
	const { config } = configWrapper;
	if (!config["api-key"] || !config["lastfm-user"]) return 300;

	const { "lastfm-user": user, "api-key": key } = config;
	const response = await apiRequest("lastfm", LASTFM.topalbums(user, key, time_range));

	if (!response) return 200;

	return await convertAlbumData(response.topalbums.album);
};

const DropdownOptions = [
	{ id: "short_term", name: "Past Month" },
	{ id: "medium_term", name: "Past 6 Months" },
	{ id: "long_term", name: "All Time" },
];

const AlbumsPage = ({ configWrapper }: { configWrapper: ConfigWrapper }) => {
	const [topAlbums, setTopAlbums] = React.useState<Album[] | 100 | 200 | 300>(100);
	const [dropdown, activeOption] = useDropdownMenu(DropdownOptions, "stats:top-albums");

	const fetchTopAlbums = async (time_range: string, force?: boolean, set = true) => {
		if (!force) {
			const storedData = storage.getItem(`top-albums:${time_range}`);
			if (storedData) return setTopAlbums(JSON.parse(storedData));
		}

		const start = window.performance.now();

		const topAlbums = await topAlbumsReq(time_range, configWrapper);
		if (set) setTopAlbums(topAlbums);
		storage.setItem(`top-albums:${time_range}`, JSON.stringify(topAlbums));

		console.log("total albums fetch time:", window.performance.now() - start);
	};

	React.useEffect(() => {
		updatePageCache(5, fetchTopAlbums, activeOption.id);
	}, []);

	React.useEffect(() => {
		fetchTopAlbums(activeOption.id);
	}, [activeOption]);

	const refresh = () => {
		fetchTopAlbums(activeOption.id, true);
	};

	const props = {
		title: "Top Albums",
		headerEls: [dropdown, <RefreshButton callback={refresh} />, <SettingsButton section="stats" />],
	};

	switch (topAlbums) {
		case 300:
			return (
				<PageContainer {...props}>
					<Status icon="error" heading="No API Key or Username" subheading="Please enter these in the settings menu" />
				</PageContainer>
			);
		case 200:
			return (
				<PageContainer {...props}>
					<Status icon="error" heading="Failed to Fetch Top Artists" subheading="An error occurred while fetching the data" />
				</PageContainer>
			);
		case 100:
			return (
				<PageContainer {...props}>
					<Status icon="library" heading="Loading" subheading="Fetching data..." />
				</PageContainer>
			);
	}

	const albumCards = topAlbums.map((album, index) => {
		const type = album.uri.startsWith("https") ? "lastfm" : "album";
		return <SpotifyCard type={type} uri={album.uri} header={album.name} subheader={`#${index + 1} Album`} imageUrl={album.image} />;
	});

	return (
		<PageContainer {...props}>
			<div className={"main-gridContainer-gridContainer grid"}>{albumCards}</div>
		</PageContainer>
	);
};

export default React.memo(AlbumsPage);
