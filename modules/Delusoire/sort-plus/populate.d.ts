import { TrackData } from "/modules/Delusoire/delulib/parse.js";
import { SortAction } from "./util.js";
export declare const fillTracksFromSpotify: (propName: SortAction) => (tracks: TrackData[]) => Promise<any>;
export declare const fillTracksFromLastFM: (tracks: TrackData[]) => Promise<TrackData[]>;
