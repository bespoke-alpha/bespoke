export interface LFMTopAlbums {
    topalbums: Topalbums;
}
export interface Topalbums {
    album: Album[];
    "@attr": TopalbumsAttr;
}
export interface TopalbumsAttr {
    user: string;
    totalPages: string;
    page: string;
    perPage: string;
    total: string;
}
export interface Album {
    artist: Artist;
    image: Image[];
    mbid: string;
    url: string;
    playcount: string;
    "@attr": AlbumAttr;
    name: string;
}
export interface AlbumAttr {
    rank: string;
}
export interface Artist {
    url: string;
    name: string;
    mbid: string;
}
export interface Image {
    size: Size;
    "#text": string;
}
export declare enum Size {
    Extralarge = "extralarge",
    Large = "large",
    Medium = "medium",
    Small = "small"
}
