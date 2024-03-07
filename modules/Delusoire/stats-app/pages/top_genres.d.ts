/// <reference types="react" />
import type { Track } from "@fostertheweb/spotify-web-api-ts-sdk";
export declare const calculateTracksMeta: (tracks: Track[]) => {
    explicitness: number;
    popularity: number;
    releaseDates: Record<string, number>;
    obscureTracks: Track[];
};
declare const _default: import("react").MemoExoticComponent<() => JSX.Element>;
export default _default;
