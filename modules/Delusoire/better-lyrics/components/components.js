var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var LyricsWrapper_1;
import { provide } from "https://esm.sh/@lit/context";
import { Task } from "https://esm.sh/@lit/task";
import { LitElement, css, html } from "https://esm.sh/lit";
import { customElement, property, query, state } from "https://esm.sh/lit/decorators.js";
import { map } from "https://esm.sh/lit/directives/map.js";
import { when } from "https://esm.sh/lit/directives/when.js";
// import { PropertyValueMap } from "https://esm.sh/v133/@lit/reactive-element/development/reactive-element.js";
// import { hermite } from "https://esm.sh/@thi.ng/ramp"
import { _ } from "/modules/std/deps.js";
import { remapScalar, vectorLerp } from "/modules/delulib/math.js";
import { MonotoneNormalSpline } from "../splines/monotoneNormalSpline.js";
import { LyricsType } from "../utils/LyricsProvider.js";
import { PlayerW } from "../utils/PlayerW.js";
import { loadedLyricsTypeCtx, scrollTimeoutCtx, scrollContainerCtx } from "./contexts.js";
import { AnimatedMixin, ScrolledMixin, SyncedContainerMixin, SyncedMixin } from "./mixins.js";
const opacityInterpolator = new MonotoneNormalSpline([
    [0, 0],
    [0.1, 0.1],
    [0.2, 0.3],
    [0.5, 0.55],
    [0.7, 0.8],
    [1, 1],
    [1.2, 0.8],
    [1.5, 0.7],
]);
const glowRadiusInterpolator = new MonotoneNormalSpline([
    [0, 100],
    [0.2, 7],
    [0.4, 5],
    [0.6, 3],
    [0.7, 2],
    [0.9, 1],
    [1, 3],
    [1.1, 7],
    [1.25, 100],
]);
const glowAlphaInterpolator = new MonotoneNormalSpline([
    [0, 0],
    [0.1, 0.2],
    [0.2, 0.35],
    [0.5, 0.65],
    [0.7, 0.9],
    [1, 1],
    [1.2, 0.6],
    [1.5, 0],
]);
const scaleInterpolator = new MonotoneNormalSpline([
    [-0.5, 1],
    [-0.2, 0.99],
    [-0.1, 0.98],
    [0, 0.94],
    [0.1, 0.99],
    [0.2, 1],
    [0.5, 1.02],
    [0.7, 1.06],
    [0.9, 1.04],
    [1, 1.02],
    [1.2, 1.01],
    [1.5, 1],
]);
let AnimatedText = class AnimatedText extends AnimatedMixin(SyncedMixin(LitElement)) {
    static { this.NAME = "animated-text"; }
    static { this.styles = css `
        :host {
            cursor: pointer;
            background-color: black;
            -webkit-text-fill-color: transparent;
            -webkit-background-clip: text;
            text-shadow: 0 0 var(--glow-radius, 0) rgba(255, 255, 255, var(--glow-alpha, 0));
            transform: translateY(var(--y-offset, 0));
            background-image: linear-gradient(
                var(--gradient-angle),
                rgba(255, 255, 255, var(--gradient-alpha)) var(--gradient-start),
                rgba(255, 255, 255, 0) var(--gradient-end)
            );
        }
    `; }
    animateContent() {
        const nextGradientAlpha = opacityInterpolator.at(this.csp).toFixed(5);
        const nextGlowRadius = `${glowRadiusInterpolator.at(this.csp)}px`;
        const nextGlowAlpha = glowAlphaInterpolator.at(this.csp).toFixed(5);
        const nextYOffset = `-${this.offsetHeight * 0.1 * this.csp}px`;
        const nextGradientStart = `${this.csp * 95}%`;
        const nextGradientEnd = `${this.csp * 105}%`;
        const nextScale = scaleInterpolator.at(this.csp).toFixed(5);
        this.style.setProperty("--gradient-alpha", nextGradientAlpha);
        this.style.setProperty("--glow-radius", nextGlowRadius);
        this.style.setProperty("--glow-alpha", nextGlowAlpha);
        this.style.setProperty("--gradient-start", nextGradientStart);
        this.style.setProperty("--gradient-end", nextGradientEnd);
        this.style.setProperty("--y-offset", nextYOffset);
        this.style.scale = nextScale;
    }
    onClick() {
        PlayerW.setTimestamp(this.tsp);
    }
    render() {
        return html `<span role="button" @click=${this.onClick}>${this.content}</span>`;
    }
};
__decorate([
    property()
], AnimatedText.prototype, "split", void 0);
AnimatedText = __decorate([
    customElement(AnimatedText.NAME)
], AnimatedText);
export { AnimatedText };
let DetailTimelineProvider = class DetailTimelineProvider extends SyncedContainerMixin(SyncedMixin(LitElement)) {
    static { this.NAME = "detail-timeline-provider"; }
    static { this.styles = css `
        :host {
            display: flex;
            flex-wrap: wrap;
        }
    `; }
    computeChildProgress(rp, child) {
        if (!this.intermediatePositions) {
            const childs = Array.from(this.childs);
            const partialWidths = childs.reduce((partialWidths, child) => (partialWidths.push(partialWidths.at(-1) + child.offsetWidth), partialWidths), [0]);
            this.lastPosition = partialWidths.at(-1);
            this.intermediatePositions = partialWidths.map(pw => pw / this.lastPosition);
        }
        return remapScalar(this.intermediatePositions[child], this.intermediatePositions[child + 1], rp);
    }
};
DetailTimelineProvider = __decorate([
    customElement(DetailTimelineProvider.NAME)
], DetailTimelineProvider);
export { DetailTimelineProvider };
let TimelineProvider = class TimelineProvider extends ScrolledMixin(SyncedContainerMixin(SyncedMixin(LitElement))) {
    static { this.NAME = "timeline-provider"; }
    static { this.styles = css `
        :host {
            display: flex;
            flex-wrap: wrap;
        }
    `; }
    computeIntermediatePosition(rsp) {
        if (!this.timelineSpline) {
            const childs = Array.from(this.childs);
            const partialWidths = childs.reduce((partialWidths, child) => (partialWidths.push(partialWidths.at(-1) + child.offsetWidth), partialWidths), [0]);
            this.lastPosition = partialWidths.at(-1);
            this.intermediatePositions = partialWidths.map(pw => pw / this.lastPosition);
            const pairs = _.zip(childs.map(child => child.tsp).concat(childs.at(-1).tep), this.intermediatePositions);
            const first = vectorLerp(pairs[0], pairs[1], -1);
            const last = vectorLerp(pairs.at(-2), pairs.at(-1), 2);
            this.timelineSpline = new MonotoneNormalSpline([first, ...pairs, last]);
        }
        return this.timelineSpline.at(rsp);
    }
    computeChildProgress(rp, child) {
        const sip = this.computeIntermediatePosition(rp);
        return remapScalar(this.intermediatePositions[child], this.intermediatePositions[child + 1], sip);
    }
};
TimelineProvider = __decorate([
    customElement(TimelineProvider.NAME)
], TimelineProvider);
export { TimelineProvider };
let LyricsContainer = class LyricsContainer extends SyncedContainerMixin(SyncedMixin(LitElement)) {
    static { this.NAME = "lyrics-container"; }
    render() {
        return html `<slot></slot>`;
    }
};
LyricsContainer = __decorate([
    customElement(LyricsContainer.NAME)
], LyricsContainer);
export { LyricsContainer };
let LyricsWrapper = class LyricsWrapper extends LitElement {
    static { LyricsWrapper_1 = this; }
    static { this.NAME = "lyrics-wrapper"; }
    static { this.SCROLL_TIMEOUT_MS = 500; }
    constructor(query) {
        super();
        this.song = null;
        this.updateSong = (song) => {
            this.song = song;
            this.loadedLyricsType = undefined;
        };
        this.lyricsTask = new Task(this, {
            task: async ([song]) => {
                const availableLyrics = await song?.lyrics;
                const lyrics = Object.values(availableLyrics)[0];
                this.loadedLyricsType = lyrics?.__type;
                return lyrics;
            },
            args: () => [this.song],
        });
        this.scrollTimeout = 0;
        this.scrollContainer = document.querySelector(query) ?? undefined;
    }
    static { this.styles = css `
        :host > animated-content-container {
            display: unset;
        }
    `; }
    updateProgress(progress) {
        if (this.loadedLyricsType === undefined || this.loadedLyricsType === LyricsType.NOT_SYNCED)
            return;
        this.container?.updateProgress(progress, 0);
    }
    onExternalScroll(e) {
        this.scrollTimeout = Date.now() + LyricsWrapper_1.SCROLL_TIMEOUT_MS;
    }
    connectedCallback() {
        super.connectedCallback();
        this.scrollContainer?.addEventListener("scroll", this.onExternalScroll);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.scrollContainer?.removeEventListener("scroll", this.onExternalScroll);
    }
    render() {
        if (!this.song) {
            return html `<div class="info">No Song Loaded</div>`;
        }
        return this.lyricsTask.render({
            pending: () => {
                return html `<div class="loading">Fetching Lyrics...</div>`;
            },
            complete: lyrics => {
                if (!lyrics || lyrics.__type === LyricsType.NOT_SYNCED) {
                    return html `<div class="error">No Lyrics Found</div>`;
                }
                const isWordSync = this.loadedLyricsType === LyricsType.WORD_SYNCED;
                return html `
                    <style>
                        * {
                            --gradient-angle: ${this.loadedLyricsType === LyricsType.WORD_SYNCED ? 90 : 180}deg;
                        }
                    </style>
                    <lyrics-container>
                        ${when(isWordSync, () => html `${map(lyrics.content, l => html `<timeline-provider tsp=${l.tsp} tep=${l.tep}
                                            >${map(l.content, w => html `<detail-timeline-provider tsp=${w.tsp} tep=${w.tep}
                                                        >${map(w.content.split(""), c => html `<animated-text
                                                                    tsp=${w.tsp}
                                                                    content=${c === " " ? " " : c}
                                                                ></animated-text>`)}</detail-timeline-provider
                                                    >`)}</timeline-provider
                                        >`)}`, () => html `${map(lyrics.content, l => html `<timeline-provider tsp=${l.tsp} tep=${l.tep}
                                            >${map(l.content, wl => html `<animated-text
                                                        tsp=${wl.tsp}
                                                        tep=${wl.tep}
                                                        content=${wl.content}
                                                    ></animated-text>`)}</timeline-provider
                                        >`)}`)}</lyrics-container
                    >,
                `;
            },
            error: e => {
                console.error(e);
                return html `<div class="error">Error</div>`;
            },
        });
    }
};
__decorate([
    property({ attribute: false })
], LyricsWrapper.prototype, "song", void 0);
__decorate([
    provide({ context: loadedLyricsTypeCtx }),
    state()
], LyricsWrapper.prototype, "loadedLyricsType", void 0);
__decorate([
    query(LyricsContainer.NAME)
], LyricsWrapper.prototype, "container", void 0);
__decorate([
    provide({ context: scrollTimeoutCtx })
], LyricsWrapper.prototype, "scrollTimeout", void 0);
__decorate([
    provide({ context: scrollContainerCtx })
], LyricsWrapper.prototype, "scrollContainer", void 0);
LyricsWrapper = LyricsWrapper_1 = __decorate([
    customElement(LyricsWrapper.NAME)
], LyricsWrapper);
export { LyricsWrapper };
