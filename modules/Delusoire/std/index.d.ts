/// <reference types="react" />
/// <reference types="mousetrap" />
export * from "./static.js";
export declare const S: {
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
} & {
    webpack: {
        require: any;
        chunks: [string, unknown][];
        modules: any[];
        exports: any[];
        exportedFunctions: Function[];
        exportedContexts: import("./expose/webpack.js").Context<any>[];
        exportedForwardRefs: import("./expose/webpack.js").ForwardRefExoticComponent<any>[];
        exportedMemos: import("./expose/webpack.js").NamedExoticComponent[];
    };
    useMatch: unknown;
    getPlayContext: Function;
    FilterContext: import("./expose/webpack.js").Context<any>;
    useContextMenuState: Function;
    enqueueCustomSnackbar: (element: import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, opts: any) => any;
    React: typeof import("react");
    ReactJSX: any;
    ReactDOM: typeof import("react-dom");
    ReactDOMServer: any;
    classnames: any;
    Color: Function & {
        CSSFormat: any;
    };
    ReactComponents: {
        SnackbarProvider: SnackbarProviderT;
        SettingColumn: import("react").FC<any>;
        SettingText: import("react").FC<any>;
        SettingToggle: import("react").FC<any>;
        IconComponent: import("react").FC<any>;
        Text: import("./expose/webpack.js").ForwardRefExoticComponent<any>;
        TextComponent: any;
        ContextMenu: unknown;
        RightClickMenu: import("react").FC<any>;
        ConfirmDialog: import("react").FC<any>;
        Tooltip: import("react").FC<any>;
        Menu: import("react").FC<any>;
        MenuItem: import("react").FC<any>;
        MenuItemSubMenu: import("react").FC<any>;
        Slider: import("react").FC<any>;
        Nav: import("./expose/webpack.js").NamedExoticComponent;
        NavTo: import("./expose/webpack.js").NamedExoticComponent;
        RemoteConfigProvider: ({ configuration, children }: {
            configuration?: {
                accessListeners: Set<any>;
                getValue: () => any;
                toBuilder: () => any;
                toJSON: () => any;
                values: Map<any, any>;
            };
            children: any;
        }) => import("react").FunctionComponentElement<any>;
        Scrollable: import("react").FC<any>;
        PanelHeader: import("react").FC<any>;
        PanelContent: import("./expose/webpack.js").ForwardRefExoticComponent<any> | import("react").FC<any>;
        PanelSkeleton: import("./expose/webpack.js").ForwardRefExoticComponent<any> | import("react").FC<any>;
        ButtonPrimary: import("./expose/webpack.js").ForwardRefExoticComponent<any>;
        ButtonSecondary: import("./expose/webpack.js").ForwardRefExoticComponent<any>;
        ButtonTertiary: import("./expose/webpack.js").ForwardRefExoticComponent<any>;
        Snackbar: {
            wrapper: import("react").FC<any>;
            simpleLayout: import("react").FC<any>;
            ctaText: import("react").FC<any>;
            styledImage: import("react").FC<any>;
        };
        Chip: import("./expose/webpack.js").ForwardRefExoticComponent<any>;
        Toggle: import("react").FC<any>;
        Router: import("react").FC<any>;
        Routes: import("react").FC<any>;
        Route: import("react").FC<any>;
        StoreProvider: import("react").FC<any>;
        Cards: any;
        Menus: any;
        PlaylistMenu: unknown;
        GenericModal: import("react").FC<any>;
        Tracklist: import("./expose/webpack.js").NamedExoticComponent;
        TracklistRow: import("./expose/webpack.js").NamedExoticComponent;
        TracklistColumnsContextProvider: Function;
    };
    ReactHooks: {
        DragHandler: Function;
        useExtractedColor: Function;
    };
    ReactQuery: {
        PersistQueryClientProvider: Function;
        QueryClient: QueryClientT;
        QueryClientProvider: any;
        notifyManager: any;
        useMutation: any;
        useQuery: any;
        useQueryClient: any;
        useSuspenseQuery: any;
        useInfiniteQuery: any;
    };
    ReactFlipToolkit: {
        Flipper: FlipperT;
        Flipped: any;
    };
    useSnackbar: any;
    _reservedPanelIds: Record<string, number>;
    Mousetrap: import("mousetrap").MousetrapStatic;
    Locale: any;
    createUrlLocale: Function;
    Snackbar: any;
    URI: {
        Types: import("./expose/webpack.js").URITypes;
        isSameIdentity: (a: any, b: any) => boolean;
        urlEncode: (str: string) => string;
        idToHex: (str: string) => string;
        hexToId: (str: string) => string;
        from: (uri: any) => any;
        fromString: (str: string) => any;
        is: {
            Ad: (url: any) => url is any;
            Album: (url: any) => url is any;
            Application: (url: any) => url is any;
            Artist: (url: any) => url is any;
            CollectionAlbum: (url: any) => url is any;
            CollectionArtist: (url: any) => url is any;
            Collection: (url: any) => url is any;
            Concert: (url: any) => url is any;
            Episode: (url: any) => url is any;
            Folder: (url: any) => url is any;
            LocalTrack: (url: any) => url is any;
            Playlist: (url: any) => url is any;
            PlaylistV2: (url: any) => url is any;
            Profile: (url: any) => url is any;
            Radio: (url: any) => url is any;
            Show: (url: any) => url is any;
            SocialSession: (url: any) => url is any;
            Station: (url: any) => url is any;
            Track: (url: any) => url is any;
        } & {
            PlaylistV1OrV2: (url: any) => url is any;
        };
        create: {
            Album: any;
            Application: any;
            Artist: any;
            CollectionAlbum: any;
            CollectionArtist: any;
            Collection: any;
            Concert: any;
            Episode: any;
            Folder: any;
            LocalAlbum: any;
            LocalArtist: any;
            PlaylistV2: any;
            Prerelease: any;
            Profile: any;
            Queue: any;
            Search: any;
            Show: any;
            SocialSession: any;
            Station: any;
            Track: any;
            UserToplist: any;
        };
    };
    extractColorPreset: (image: any) => Promise<any>;
} & import("./expose/index.js").ExposedOther;
import type { Module } from "/hooks/module.js";
import { Registrar } from "./registers/registers.js";
export declare const createRegistrar: (mod: Module & {
    registrar?: Registrar;
}) => Registrar;
export declare const createStorage: <M extends Module>(mod: M & {
    storage?: Storage;
}) => Storage;
export declare const createLogger: (mod: Module & {
    logger?: Console;
}) => Console;
declare class Event<A> {
    private getArg;
    callbacks: ((a: A) => void)[];
    constructor(getArg: () => A);
    on(callback: any): void;
    fire(): void;
}
export declare const Events: {
    Player: {
        update: Event<any>;
        songchanged: Event<any>;
    };
};
