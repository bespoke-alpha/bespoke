import { LitElement } from "https://esm.sh/lit";
type Constructor<T = {}> = new (...args: any[]) => T;
export declare class SyncedMixinI {
    content: string;
    tsp: number;
    tep: number;
    updateProgress(scaledProgress: number, depthToActiveAncestor: number): void;
}
export declare const SyncedMixin: <T extends Constructor<LitElement>>(superClass: T) => Constructor<SyncedMixinI> & T;
export declare const AnimatedMixin: <T extends Constructor<any>>(superClass: T) => {
    new (...args: any[]): {
        [x: string]: any;
        csp: number;
        dtaa: number;
        updateProgress(scaledProgress: number, depthToActiveAncestor: number): void;
        shouldAnimate(clampedScaledProgress: number, depthToActiveAncestor: number): boolean;
        animateContent(): void;
    };
} & T;
export declare const ScrolledMixin: <T extends Constructor<any>>(superClass: T) => {
    new (...args: any[]): {
        [x: string]: any;
        scrollTimeout: number;
        scrollContainer?: HTMLElement;
        dtaa: number;
        updateProgress(progress: number, depthToActiveAncestor: number): void;
    };
} & T;
export declare const SyncedContainerMixin: <T extends Constructor<any>>(superClass: T) => {
    new (...args: any[]): {
        [x: string]: any;
        childs: NodeListOf<LitElement & SyncedMixinI>;
        computeChildProgress(rp: number, child: number): number;
        updateProgress(rp: number, depthToActiveAncestor: number): void;
        render(): any;
    };
} & T;
export {};
