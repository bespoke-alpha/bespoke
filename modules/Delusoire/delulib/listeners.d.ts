export declare const getTrackLists: () => HTMLDivElement[];
export declare const getTrackListTracks: (trackList: HTMLDivElement) => HTMLDivElement[];
export declare const onHistoryChanged: (toMatchTo: string | RegExp | ((location: string) => boolean), callback: (uri?: string) => void, dropDuplicates?: boolean) => () => undefined;
declare const PRESENTATION_KEY: unique symbol;
type TrackListElement = HTMLDivElement & {
    [PRESENTATION_KEY]?: HTMLDivElement;
};
type TrackElement = HTMLDivElement & {
    props?: Record<string, any>;
};
type TrackListMutationListener = (tracklist: Required<TrackListElement>, tracks: Array<Required<TrackElement>>) => void;
export declare const onTrackListMutationListeners: TrackListMutationListener[];
export {};
