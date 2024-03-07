import { Item2, ItemsReleases } from "./sharedTypes.js";
export type fetchArtistDiscographyRes = {
    __typename: "artist";
    discography: {
        all: ItemsReleases<Item2>;
    };
};
export declare const fetchArtistDiscography: (uri: string, offset?: number, limit?: number) => Promise<{
    releases: import("./sharedTypes.js").Items<Item2>;
}[]>;
