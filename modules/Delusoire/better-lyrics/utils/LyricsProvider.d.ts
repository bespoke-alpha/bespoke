import { OneUplet } from "/modules/Delusoire/delulib/fp.js";
import { S } from "/modules/Delusoire/std/index.js";
export type Lyrics = {
    notSynced?: NotSynced;
    lineSynced?: LineSynced;
    wordSynced?: WordSynced;
};
export type SyncedContent = {
    tsp: number;
    tep: number;
    content: Array<SyncedContent> | string;
};
type SW<A> = {
    tsp: 0;
    tep: 1;
    content: A;
};
export type S<A> = {
    tsp: number;
    tep: number;
    content: A;
};
export declare enum LyricsType {
    NOT_SYNCED = 0,
    LINE_SYNCED = 1,
    WORD_SYNCED = 2
}
export declare const Filler = "\u266A";
export type NotSynced = SW<string> & {
    __type: LyricsType.NOT_SYNCED;
};
export type LineSynced = SW<Array<S<OneUplet<S<string>>>>> & {
    __type: LyricsType.LINE_SYNCED;
};
export type WordSynced = SW<Array<S<Array<S<string>>>>> & {
    __type: LyricsType.WORD_SYNCED;
};
export declare const flattenLyrics: (lyrics: SyncedContent) => Array<S<string>>;
export declare const findLyrics: (info: {
    uri: string;
    title: string;
    artist: string;
    album: string;
    durationS: number;
}) => Promise<Lyrics>;
export {};
