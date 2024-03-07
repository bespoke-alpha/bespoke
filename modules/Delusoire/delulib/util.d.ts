export declare const SpotifyLoc: {
    before: {
        start: () => {
            before: "start";
        };
        fromUri: (uri: string) => {
            before: {
                uri: string;
            };
        };
        fromUid: (uid: string) => {
            before: {
                uid: string;
            };
        };
    };
    after: {
        end: () => {
            after: "end";
        };
        fromUri: (uri: string) => {
            after: {
                uri: string;
            };
        };
        fromUid: (uid: string) => {
            after: {
                uid: string;
            };
        };
    };
};
export declare const normalizeStr: (str: string) => string;
export declare class PermanentMutationObserver extends MutationObserver {
    target: HTMLElement | null;
    constructor(targetSelector: string, callback: MutationCallback, opts?: MutationObserverInit);
}
export declare const waitForElement: <E extends Element>(selector: string, timeout?: number, location?: HTMLElement, notEl?: E) => Promise<E>;
export declare const sleep: (ms: number) => Promise<unknown>;
export declare const mainElement: HTMLElement;
export declare const REACT_FIBER: string, REACT_PROPS: string;
export declare const createQueueItem: (queued: boolean) => ({ uri, uid }: {
    uri: string;
    uid?: string;
}) => {
    contextTrack: {
        uri: string;
        uid: string;
        metadata: {
            is_queued: string;
        };
    };
    removed: any[];
    blocked: any[];
    provider: "queue" | "context";
};
export declare const setQueue: (nextTracks: Array<ReturnType<ReturnType<typeof createQueueItem>>>, contextUri?: string) => Promise<any>;
export declare const setPlayingContext: (uri: string) => any;
