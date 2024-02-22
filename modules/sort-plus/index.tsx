import { TrackData } from "../delulib/parse.js";
import { createQueueItem, setQueue as _setQueue } from "../delulib/util.js";
import { _, fp } from "/hooks/deps.js";
import { S, extend } from "../std/index.js";
import { Button } from "../std/registers/topbarLeftButton.js";

import { createPlaylistFromLastSortedQueue, reordedPlaylistLikeSortedQueue } from "./playlistsInterop.js";
import { fillTracksFromLastFM, fillTracksFromSpotify } from "./populate.js";
import { CONFIG } from "./settings.js";
import { AsyncTracksOperation, SEPARATOR_URI, SortAction, SortActionIcon, SortActionProp, URI_is_LikedTracks, getTracksFromUri } from "./util.js";
import { SVGIcons } from "../std/index.js";

declare global {
	// biome-ignore lint/style/noVar: global scope
	var lastSortedQueue: TrackData[];
}

const { URI } = S;
const PlayerAPI = S.Platform.getPlayerAPI();

export let lastFetchedUri: string;
export let lastSortAction: SortAction | "True Shuffle" | "Stars";
globalThis.lastSortedQueue = [];

let invertOrder = 0;
addEventListener("keydown", event => {
	if (!event.repeat && event.key === "Shift") invertOrder = 1;
});

addEventListener("keyup", event => {
	if (!event.repeat && event.key === "Shift") invertOrder = 0;
});

const populateTracks: (sortProp: SortAction) => AsyncTracksOperation = _.cond([
	[fp.startsWith("Spotify"), fillTracksFromSpotify],
	[fp.startsWith("LastFM"), () => fillTracksFromLastFM],
]);

const setQueue = (tracks: TrackData[]) => {
	if (PlayerAPI._state.item?.uid == null) return void S.Snackbar.enqueueSnackbar("Queue is null!", { variant: "error" });

	const dedupedQueue = _.uniqBy(tracks, "uri");

	globalThis.lastSortedQueue = dedupedQueue;

	const isLikedTracks = URI_is_LikedTracks(lastFetchedUri);

	const queue = globalThis.lastSortedQueue.concat({ uri: SEPARATOR_URI } as TrackData).map(createQueueItem(isLikedTracks));

	return _setQueue(queue, isLikedTracks ? undefined : lastFetchedUri);
};

// Menu

const sortTracksBy = (sortAction: typeof lastSortAction, sortFn: AsyncTracksOperation) => async (uri: string) => {
	lastSortAction = sortAction;
	const descending = invertOrder ^ Number(CONFIG.descending);
	lastFetchedUri = uri;
	const tracks = await getTracksFromUri(uri);
	let sortedTracks = await sortFn(tracks);
	if (CONFIG.preventDuplicates) {
		sortedTracks = _.uniqBy(sortedTracks, "name");
	}
	descending && sortedTracks.reverse();
	return await setQueue(sortedTracks);
};

const createSubMenuForSortProp = ({ sortAction }: { sortAction: SortAction }) => {
	const { props } = useMenuItem();
	const uri = props.uri;

	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() => {
				const sortActionProp = SortActionProp[sortAction];
				const sortFn = async (tracks: TrackData[]) => {
					const filledTracks = await populateTracks(sortAction)(tracks);
					const filteredTracks = filledTracks.filter(track => track[sortActionProp] != null);
					return _.sortBy(filteredTracks, sortActionProp);
				};
				sortTracksBy(sortAction, sortFn)(uri);
			}}
			leadingIcon={createIconComponent({ icon: SVGIcons[SortActionIcon[sortAction]] })}
		>
			{sortAction}
		</S.ReactComponents.MenuItem>
	);
};

const sortTracksByShuffle = sortTracksBy("True Shuffle", _.shuffle);
const sortTracksByStars = sortTracksBy(
	"Stars",
	fp.sortBy((track: TrackData) => globalThis.tracksRatings[track.uri] ?? 0),
);

const SubMenuItems = Object.values(SortAction).map(sortAction => S.React.createElement(createSubMenuForSortProp, { sortAction }));

import { createIconComponent } from "../std/api/createIconComponent.js";
import { Module } from "/hooks/module.js";
import { useMenuItem } from "../std/registers/menu.js";

const SubMenuItemShuffle = () => {
	const { props } = useMenuItem();
	const uri = props.uri;

	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() => sortTracksByShuffle(uri)}
			leadingIcon={createIconComponent({ icon: SVGIcons.shuffle })}
		>
			True shuffle
		</S.ReactComponents.MenuItem>
	);
};

const SubMenuItemStars = () => {
	if (!globalThis.tracksRatings) return;
	const { props } = useMenuItem();
	const uri = props.uri;

	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() => sortTracksByStars(uri)}
			leadingIcon={createIconComponent({ icon: SVGIcons["heart-active"] })}
		>
			Stars
		</S.ReactComponents.MenuItem>
	);
};

SubMenuItems.push(<SubMenuItemShuffle />, <SubMenuItemStars />);

export default function (_module: Module) {
	const module = extend(_module);
	const { registrar } = module;

	registrar.register(
		"menu",
		S.React.createElement(() => {
			const { props } = useMenuItem();
			const uri = props.uri;
			return (
				<S.ReactComponents.MenuItem
					disabled={false}
					onClick={() => {
						CONFIG.sortedPlaylistsFolderUri = uri;
					}}
					leadingIcon={createIconComponent({ icon: SVGIcons["playlist-folder"] })}
				>
					Choose for Sorted Playlists
				</S.ReactComponents.MenuItem>
			);
		}),
		({ props }) => {
			return URI.is.Folder(props?.reference?.uri);
		},
	);

	registrar.register(
		"menu",
		<S.ReactComponents.MenuItemSubMenu displayText="Sort by" depth={1} placement="right-start" disabled={false}>
			{SubMenuItems}
		</S.ReactComponents.MenuItemSubMenu>,
		({ props }) => {
			const uri = props?.uri;
			return uri && [URI.is.Album, URI.is.Artist, URI_is_LikedTracks, URI.is.Track, URI.is.PlaylistV1OrV2].some(f => f(uri));
		},
	);
	registrar.register(
		"topbarLeftButton",
		<Button label="Create a Playlist from Sorted Queue" icon={SVGIcons.plus2px} onClick={createPlaylistFromLastSortedQueue} />,
	);
	registrar.register(
		"topbarLeftButton",
		<Button label="Reorder Playlist from Sorted Queue" icon={SVGIcons["chart-down"]} onClick={reordedPlaylistLikeSortedQueue} />,
	);
}
