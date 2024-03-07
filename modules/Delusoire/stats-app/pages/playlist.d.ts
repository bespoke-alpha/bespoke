/// <reference types="react" />
import type { Artist } from "@fostertheweb/spotify-web-api-ts-sdk";
export declare const fetchAudioFeaturesMeta: (ids: string[]) => Promise<any>;
export declare const calculateGenresFromArtists: (artists: Artist[], getArtistMultiplicity: (index: number) => number) => Record<string, number>;
export declare const fetchArtistsMeta: (ids: string[]) => Promise<{
    artists: any;
    genres: Record<string, number>;
}>;
export declare const fetchAlbumsMeta: (ids: string[]) => Promise<{
    albums: any;
    releaseYears: Record<string, number>;
}>;
declare const _default: import("react").MemoExoticComponent<({ uri }: {
    uri: string;
}) => JSX.Element>;
export default _default;
