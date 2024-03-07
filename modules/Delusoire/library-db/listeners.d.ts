export declare const mapAssocs: (uris: string[], fn: (assocs: Set<string>) => void) => void;
export declare const SavedPlaylists: Set<string>;
export declare const PlaylistItems: Map<string, Set<string>>;
export declare const useLivePlaylistItems: (uri: string) => Set<string>;
