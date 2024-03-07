/// <reference types="mousetrap" />
import { LitElement } from "https://esm.sh/lit";
export declare const mousetrapInst: import("mousetrap").MousetrapInstance;
export declare const KEY_LIST: string[];
export declare let listeningToSneakBinds: boolean;
declare class _SneakKey extends LitElement {
    static styles: any;
    key: string;
    target: HTMLElement;
    protected render(): any;
}
export declare class _SneakOverlay extends LitElement {
    static styles: any;
    props: {
        key: string;
        target: HTMLElement;
    }[];
    constructor();
    disconnectedCallback(): void;
    updateProps(key: KeyboardEvent["key"]): void;
    protected render(): any;
}
declare global {
    interface HTMLElementTagNameMap {
        "sneak-key": _SneakKey;
        "sneak-overlay": _SneakOverlay;
    }
}
export {};
