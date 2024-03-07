import { LitElement, PropertyValues } from "https://esm.sh/lit";
declare global {
    interface HTMLElementTagNameMap {
        "genre-container": _ArtistGenreContainer;
        "genre-link": _GenreLink;
    }
}
declare class _GenreLink extends LitElement {
    static styles: any;
    genre: string;
    private openPlaylistsSearch;
    protected render(): any;
}
declare class _ArtistGenreContainer extends LitElement {
    name?: string;
    uri?: string;
    genres: string[];
    isSmall: boolean;
    fetchGenres: () => Promise<any[]>;
    protected willUpdate(changedProperties: PropertyValues<this>): Promise<void>;
    protected render(): any;
}
export {};
