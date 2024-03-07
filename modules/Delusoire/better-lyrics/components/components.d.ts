import { LitElement } from "https://esm.sh/lit";
import { LyricsType } from "../utils/LyricsProvider.js";
import { Song } from "../utils/Song.js";
declare global {
    interface HTMLElementTagNameMap {
        "lyrics-wrapper": LyricsWrapper;
        "lyrics-container": LyricsContainer;
        "timeline-provider": TimelineProvider;
        "detail-timeline-provider": DetailTimelineProvider;
        "animated-text": AnimatedText;
    }
}
declare const AnimatedText_base: any;
export declare class AnimatedText extends AnimatedText_base {
    static readonly NAME: string;
    split: boolean;
    static styles: any;
    animateContent(): void;
    onClick(): void;
    render(): any;
}
interface Spline<A> {
    at(t: number): A;
}
declare const DetailTimelineProvider_base: any;
export declare class DetailTimelineProvider extends DetailTimelineProvider_base {
    static readonly NAME = "detail-timeline-provider";
    static styles: any;
    intermediatePositions?: number[];
    lastPosition?: number;
    computeChildProgress(rp: number, child: number): number;
}
declare const TimelineProvider_base: any;
export declare class TimelineProvider extends TimelineProvider_base {
    static readonly NAME = "timeline-provider";
    static styles: any;
    intermediatePositions?: number[];
    lastPosition?: number;
    timelineSpline?: Spline<number>;
    computeIntermediatePosition(rsp: number): number;
    computeChildProgress(rp: number, child: number): number;
}
declare const LyricsContainer_base: any;
export declare class LyricsContainer extends LyricsContainer_base {
    static readonly NAME = "lyrics-container";
    render(): any;
}
export declare class LyricsWrapper extends LitElement {
    static readonly NAME = "lyrics-wrapper";
    static readonly SCROLL_TIMEOUT_MS = 500;
    constructor(query: string);
    static styles: any;
    song: Song | null;
    loadedLyricsType?: LyricsType;
    updateSong: (song: Song | null) => void;
    private lyricsTask;
    container?: LyricsContainer;
    updateProgress(progress: number): void;
    scrollTimeout: number;
    scrollContainer?: HTMLElement;
    private onExternalScroll;
    connectedCallback(): void;
    disconnectedCallback(): void;
    render(): any;
}
export {};
