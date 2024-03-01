import { TrackData } from "/modules/Delusoire/delulib/parse.js";
import { setQueue as _setQueue, createQueueItem } from "/modules/Delusoire/delulib/util.js";
import { _, fp } from "/modules/Delusoire/std/deps.js";
import { S } from "/modules/Delusoire/std/index.js";

import { fillTracksFromLastFM, fillTracksFromSpotify } from "./populate.js";
import { CONFIG } from "./settings.js";
import { AsyncTracksOperation, SEPARATOR_URI, SortAction, SortActionIcon, SortActionProp, URI_is_LikedTracks, getTracksFromUri } from "./util.js";
import { SVGIcons } from "/modules/Delusoire/std/index.js";

export * from "./playlistsInterop.js";

declare global {
	// biome-ignore lint/style/noVar: global scope
	var lastSortedQueue: TrackData[];
}

const PlayerAPI = S.Platform.getPlayerAPI();

export let lastFetchedUri: string;
export let lastSortAction: SortAction | "True Shuffle" | "Stars";
globalThis.lastSortedQueue = [];

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

const sortTracksBy = (sortAction: typeof lastSortAction, sortFn: AsyncTracksOperation, descending: boolean) => async (uri: string) => {
	lastSortAction = sortAction;
	lastFetchedUri = uri;
	const tracks = await getTracksFromUri(uri);
	let sortedTracks = await sortFn(tracks);
	if (CONFIG.preventDuplicates) {
		sortedTracks = _.uniqBy(sortedTracks, "name");
	}
	descending && sortedTracks.reverse();
	return await setQueue(sortedTracks);
};

type SortBySubMenuItemProps = { descending: boolean };
type GenericSortBySubMenuItemProps = SortBySubMenuItemProps & { sortAction: SortAction };
const GenericSortBySubMenuItem = ({ descending, sortAction }: GenericSortBySubMenuItemProps) => {
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
				sortTracksBy(sortAction, sortFn, descending)(uri);
			}}
			leadingIcon={createIconComponent({ icon: SVGIcons[SortActionIcon[sortAction]] })}
		>
			{sortAction}
		</S.ReactComponents.MenuItem>
	);
};

const SubMenuItems = Object.values(SortAction).map(
	sortAction => (props: SortBySubMenuItemProps) =>
		S.React.createElement(GenericSortBySubMenuItem, {
			...props,
			sortAction,
		}),
);

import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";
import { useMenuItem } from "/modules/Delusoire/std/registers/menu.js";

const SortByShuffleSubMenuItem = ({ descending }: SortBySubMenuItemProps) => {
	const { props } = useMenuItem();
	const uri = props.uri;

	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() => sortTracksBy("True Shuffle", _.shuffle, descending)(uri)}
			leadingIcon={createIconComponent({ icon: SVGIcons.shuffle })}
		>
			True shuffle
		</S.ReactComponents.MenuItem>
	);
};

const SortByStarsSubMenuItem = ({ descending }: SortBySubMenuItemProps) => {
	if (!globalThis.tracksRatings) return;
	const { props } = useMenuItem();
	const uri = props.uri;

	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() =>
				sortTracksBy(
					"Stars",
					fp.sortBy((track: TrackData) => globalThis.tracksRatings[track.uri] ?? 0),
					descending,
				)(uri)
			}
			leadingIcon={createIconComponent({ icon: SVGIcons["heart-active"] })}
		>
			Stars
		</S.ReactComponents.MenuItem>
	);
};

SubMenuItems.push(SortByShuffleSubMenuItem, SortByStarsSubMenuItem);

export const FolderPickerMenuItem = () => {
	const { props } = useMenuItem();
	const { uri } = props.reference;
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
};

export const SortBySubMenu = () => {
	const { modifierKeyHeld } = S.useContextMenuState();
	const descending = modifierKeyHeld ^ Number(CONFIG.descending);

	const leadingIcon = createIconComponent({ icon: SVGIcons[descending ? "chart-down" : "chart-up"] });

	return (
		<S.ReactComponents.MenuItemSubMenu leadingIcon={leadingIcon} displayText="Sort by" depth={1} placement="right-start" disabled={false}>
			{SubMenuItems.map(SubMenuItem => (
				<SubMenuItem descending={descending as unknown as boolean} />
			))}
		</S.ReactComponents.MenuItemSubMenu>
	);
};
