export interface LFMTopTracks {
    track: Track[];
    "@attr": TopTracksAttr;
}
export interface TopTracksAttr {
    user: string;
    totalPages: string;
    page: string;
    perPage: string;
    total: string;
}
export interface Track {
    streamable: Streamable;
    mbid: string;
    name: string;
    image: Image[];
    artist: Artist;
    url: string;
    duration: string;
    "@attr": TrackAttr;
    playcount: string;
}
export interface TrackAttr {
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
export interface Streamable {
    fulltrack: string;
    "#text": string;
}
