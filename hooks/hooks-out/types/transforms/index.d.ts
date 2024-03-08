export declare const internalRegisterTransform: <A = void>({ transform, then, glob, noAwait }: import("./transform.js").MixinProps<A>) => void;
export declare const applyTransforms: (path: string) => string | Promise<string>;
