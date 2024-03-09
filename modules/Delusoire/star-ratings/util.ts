import { fetchFolder, fetchPlaylistContents } from "/modules/Delusoire/delulib/platformApi.js";
import { CONFIG } from "./settings.js";
import { REACT_PROPS } from "/modules/Delusoire/std/api/util.js";

export const getTrackLists = () => Array.from(document.querySelectorAll<HTMLDivElement>(".main-trackList-trackList.main-trackList-indexable"));
export const getTrackListTracks = (trackList: HTMLDivElement) =>
	Array.from(trackList.querySelectorAll<HTMLDivElement>(".main-trackList-trackListRow"));

export const getTrackListTrackUri = (track: HTMLDivElement) => {
	const rowSectionEnd = track.querySelector<HTMLDivElement>(".main-trackList-rowSectionEnd")!;
	const reactProps = rowSectionEnd[REACT_PROPS];
	const { props } =
		// artist & local tracks & albums
		reactProps.children.at?.(-1).props.menu ??
		// playlists
		reactProps.children.props.children.at(-1).props.menu;

	return props.uri;
};

export const getNowPlayingBar = () => document.querySelector<HTMLDivElement>("div.main-nowPlayingBar-nowPlayingBar")!;
export const getCollectionActionBarRow = () => document.querySelector<HTMLDivElement>("div.main-actionBar-ActionBarRow");

export const playlistButtonSelector = `button[aria-label="Add to Liked Songs"], button[aria-label="Add to playlist"], button[aria-label="Remove recommendation"]`;
export const getPlaylistButton = (parent: HTMLElement) => parent.querySelector<HTMLButtonElement>(playlistButtonSelector)!;
export const getCollectionPlaylistButton = () => {
	const ab = getCollectionActionBarRow();
	return ab?.querySelector<HTMLButtonElement>(`button[aria-label="Remove from Your Library"], button[aria-label="Save to Your Library"]`);
};
export const loadRatings = async () => {
	const ratingsFolder = await fetchFolder(CONFIG.ratingsFolderUri);

	playlistUris = ratingsFolder.items
		.map(p => [p.uri, Number(p.name)] as const)
		.reduce((uris, [uri, rating]) => {
			uris[rating] = uri;
			return uris;
		}, [] as string[]);

	const playlists = await Promise.all(playlistUris.map(fetchPlaylistContents));
	globalThis.tracksRatings = playlists
		.flatMap((tracks, rating) => tracks?.map(t => [t.uri, rating] as const) ?? [])
		.reduce(
			(acc, [trackUri, rating]) =>
				Object.assign(acc, {
					[trackUri]: Math.max(rating, acc[trackUri] ?? 0),
				}),
			{} as Record<string, number>,
		);
};
