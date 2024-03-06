export type Platform = PlatformAutoGen;
export type ExposedPlatform = ReturnType<typeof expose>;
export declare function expose({ Platform }: {
    Platform: Platform;
}): {
    Platform: PlatformAutoGen;
    Cosmos: {
        del: (a: any, b: any) => any;
        get: (a: any, b: any) => any;
        head: (a: any) => any;
        patch: (a: any, b: any) => any;
        post: (a: any, b: any) => any;
        postSub: (a: any, b: any, c: any) => any;
        put: (a: any, b: any) => any;
        request: (a: any, b: any, c: any) => any;
        requestFactory: () => any;
        resolve: (a: any, b: any, c: any) => any;
        resolver: {
            cancel: () => any;
            onFailure: (a: any, b: any, c: any) => any;
            onSuccess: (a: any, b: any, c: any) => any;
            resolve: (a: any, b: any) => any;
            send: () => any;
        };
        sub: (a: any, b: any) => any;
    };
};
