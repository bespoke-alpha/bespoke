type async = {
    <A, B>(f: (a: A) => Promise<B>): (fa: Promise<A>) => Promise<B>;
    <A, B>(f: (a: A) => B): (fa: Promise<A>) => Promise<B>;
};
export declare const pMchain: async;
export declare const chunkifyN: (n: number) => <A, R>(fn: (a: A[]) => R) => (args: A[]) => Promise<any>;
export declare const chunkify50: <A, R>(fn: (a: A[]) => R) => (args: A[]) => Promise<any>;
export declare const chunkify20: <A, R>(fn: (a: A[]) => R) => (args: A[]) => Promise<any>;
export declare const progressify: <F extends (...args: any) => any>(f: F, n: number) => (..._: Parameters<F>) => Promise<Awaited<ReturnType<F>>>;
export type OneUplet<E> = [E];
export type TwoUplet<E> = [E, E];
export type Triplet<E> = [E, E, E];
export type Quadruplet<E> = [E, E, E, E];
export declare const zip_n_uplets: <R>(n: number) => <A>(a: A[]) => R[];
export {};
