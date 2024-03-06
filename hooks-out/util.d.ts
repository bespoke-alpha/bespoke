type Predicate<A> = (input: A) => boolean;
export declare function findBy(...tests: Array<string | RegExp | Predicate<any>>): <A>(xs: A[]) => A;
export declare const fetchText: (path: string) => Promise<string>;
export declare const fetchJSON: (path: string) => Promise<any>;
export declare const findMatchingPos: (str: string, start: number, direction: 1 | -1, pair: [string, string], scopes: number) => number;
export declare const matchLast: (str: string, pattern: RegExp) => RegExpMatchArray;
export declare const visited: Map<any, any>;
export declare const type: (obj: any, access: string) => string;
export {};
