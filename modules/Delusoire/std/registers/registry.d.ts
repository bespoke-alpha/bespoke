export type Predicate<I> = (input: I) => boolean;
export declare class Registry<A, B> {
    _A: A;
    _B: B;
    private registered;
    getItems(input: B, reverse?: boolean): A[];
    register(item: A, predicate: Predicate<B>): A;
    unregister(item: A): A;
}
