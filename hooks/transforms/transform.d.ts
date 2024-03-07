import type { Module } from "../module.js";
export declare class SourceFile {
    path: string;
    objectURL?: string;
    transforms: ((input: string) => string)[];
    constructor(path: string);
    mixin(transform: (input: string) => string): void;
    getObjectURL(): Promise<string>;
}
export declare const sources: SourceFile[];
export type Thunk<A> = (value: A) => void;
export type MixinProps<A> = {
    transform: (emit: Thunk<A>) => (input: string) => string;
    then?: (emitted: A) => void;
    glob: RegExp;
    noAwait?: boolean;
};
export type RegisterTransformFN = ReturnType<typeof createRegisterTransform>;
export declare const createRegisterTransform: (module: Module) => <A = void>({ transform, then, glob, noAwait }: MixinProps<A>) => void;
