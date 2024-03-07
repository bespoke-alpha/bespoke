export declare const getTrackLists: () => HTMLDivElement[];
export declare const getTrackListTracks: (trackList: HTMLDivElement) => HTMLDivElement[];
export declare const getTrackListTrackUri: (track: HTMLDivElement) => any;
export declare const getNowPlayingBar: () => HTMLDivElement;
export declare const getCollectionActionBarRow: () => HTMLDivElement;
export declare const playlistButtonSelector = "button[aria-label=\"Add to Liked Songs\"], button[aria-label=\"Add to playlist\"], button[aria-label=\"Remove recommendation\"]";
export declare const getPlaylistButton: (parent: HTMLElement) => HTMLButtonElement;
export declare const getCollectionPlaylistButton: () => HTMLButtonElement;
export declare const loadRatings: () => Promise<void>;
