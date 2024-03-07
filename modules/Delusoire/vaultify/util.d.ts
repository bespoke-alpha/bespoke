export type PoF = Playlist | Folder;
export interface Playlist {
    type: "playlist";
    name: string;
    isOwnedBySelf: boolean;
    uri: string;
}
export interface Folder {
    type: "folder";
    name: string;
    items: PoF[];
}
type SpotifyTrackUri = string & {
    _: "track";
};
type SpotifyPlaylistUri = string & {
    _: "playlist";
};
type namedProp<A> = Record<string, A>;
export type LikedPlaylist = namedProp<SpotifyPlaylistUri>;
export type PersonalPlaylist = namedProp<SpotifyTrackUri[]>;
export type PersonalFolder = namedProp<Array<LikedPlaylist | PersonalPlaylist | PersonalFolder>>;
export declare const isContentOfPersonalPlaylist: (subleaf: PersonalFolder[""] | PersonalPlaylist[""]) => subleaf is SpotifyTrackUri[];
export {};
