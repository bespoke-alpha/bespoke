import { LitElement, PropertyValues, css, html } from "https://esm.sh/lit";
import { customElement, property, state } from "https://esm.sh/lit/decorators.js";
import { join } from "https://esm.sh/lit/directives/join.js";
import { map } from "https://esm.sh/lit/directives/map.js";

import { _ } from "/hooks/deps.js";
import { S } from "../std/index.js";

const History = S.Platform.getHistory();

declare global {
	interface HTMLElementTagNameMap {
		"genre-container": _ArtistGenreContainer;
		"genre-link": _GenreLink;
	}
}

@customElement("genre-link")
class _GenreLink extends LitElement {
	static styles = css`
        :host > a {
            color: var(--spice-subtext);
            font-size: var(--genre-link-size);
        }
    `;

	@property()
	genre = "No Genre";

	private openPlaylistsSearch() {
		History.push({ pathname: `/search/${this.genre}/playlists` });
	}

	protected render() {
		return html`<a href="#" @click=${this.openPlaylistsSearch}>${_.startCase(this.genre)}</a>`;
	}
}

@customElement("genre-container")
class _ArtistGenreContainer extends LitElement {
	@property()
	name?: string = undefined;

	@property()
	uri?: string = undefined;

	@state()
	genres: string[] = [];

	@property({ type: Boolean })
	isSmall = true;

	@property()
	fetchGenres = () => Promise.resolve([]);

	protected async willUpdate(changedProperties: PropertyValues<this>) {
		if (changedProperties.has("uri") && this.uri) {
			this.genres = await this.fetchGenres();
		}
	}

	protected render() {
		const artistGenreLinks = map(this.genres, genre => html`<genre-link genre=${genre} />`);
		const divider = () => html`<span>, </span>`;

		return html`<style>
                a {
                    --genre-link-size: ${this.isSmall ? "12px" : "1rem"};
                }
            </style>
            <div className="main-entityHeader-detailsText genre-container">
                ${this.name && html`<span>${this.name} : </span>`} ${join(artistGenreLinks, divider)}
            </div>`;
	}
}
