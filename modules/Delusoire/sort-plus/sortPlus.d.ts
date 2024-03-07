/// <reference types="react" />
import { TrackData } from "/modules/Delusoire/delulib/parse.js";
import { SortAction } from "./util.js";
export * from "./playlistsInterop.js";
declare global {
    var lastSortedQueue: TrackData[];
}
export declare let lastFetchedUri: string;
export declare let lastSortAction: SortAction | "True Shuffle" | "Stars";
export declare const FolderPickerMenuItem: () => JSX.Element;
export declare const SortBySubMenu: () => JSX.Element;
