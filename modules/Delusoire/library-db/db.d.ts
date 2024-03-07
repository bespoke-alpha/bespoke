export declare const db: {
    tracks: Table<Track>;
    playlists: Table;
};
export declare const getTracksFromURIs: (primaryKeys: string[]) => Promise<any>;
export declare const getPlaylistsFromURIs: (primaryKeys: string[]) => Promise<any>;
