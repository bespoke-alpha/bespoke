import { LikedPlaylist, PersonalFolder, PersonalPlaylist, PoF } from "./util.js";
export type LibraryBackup = Record<string, Array<string>> & {
    rootlist: PersonalFolder;
};
export type LocalStorageBackup = {
    localStore: Array<[string, string]>;
    localStoreAPI: Array<[string, string]>;
};
type Prefs = Record<string, {
    number?: number;
    bool?: boolean;
    string?: string;
}>;
type ProductState = Record<string, string>;
export type SettingBackup = {
    prefs: Prefs;
    productState: ProductState;
};
export declare const getLibrary: () => Promise<LibraryBackup>;
declare const Prefs: {
    create: (a: any) => any;
    get: (a: any) => any;
    getAll: (a: any) => any;
    options: {};
    set: (a: any) => any;
    sub: (a: any) => any;
    subAll: (a: any) => any;
    transport: {
        call: (a: any, b: any, c: any) => any;
        callSingle: (a: any) => any;
        callStream: (a: any) => any;
        cancel: () => any;
        send: () => any;
    };
};
declare const ProductState: {
    delOverridesValues: (a: any) => any;
    getValues: (a: any) => any;
    options: {};
    putOverridesValues: (a: any) => any;
    putValues: (a: any) => any;
    subValues: (a: any) => any;
    transport: {
        call: (a: any, b: any, c: any) => any;
        callSingle: (a: any) => any;
        callStream: (a: any) => any;
        cancel: () => any;
        send: () => any;
    };
};
export declare const getSettings: () => Promise<SettingBackup>;
export declare const getLocalStorage: () => [string, any][];
export declare const getLocalStoreAPI: () => (readonly [string, string | number | boolean | {} | {
    focusState: {
        addFocusListener: () => any;
        hasFocus: () => boolean;
        listeners: any[];
        removeAllFocusListeners: () => any;
        removeFocusListener: () => any;
    };
    history: {
        action: string;
        block: () => () => undefined;
        canGo: () => boolean;
        createHref: () => any;
        entries: any[];
        go: () => any;
        goBack: () => any;
        goForward: () => any;
        index: number;
        length: number;
        listen: () => () => undefined;
        location: undefined;
        push: (a: any) => any;
        replace: (a: any) => any;
    };
    onFocusChanged: () => any;
    setAdStateKey: (a: any) => any;
}[] | {
    "": {
        focusState: {
            addFocusListener: () => any;
            hasFocus: () => boolean;
            listeners: any[];
            removeAllFocusListeners: () => any;
            removeFocusListener: () => any;
        };
        history: {
            action: string;
            block: () => () => undefined;
            canGo: () => boolean;
            createHref: () => any;
            entries: any[];
            go: () => any;
            goBack: () => any;
            goForward: () => any;
            index: number;
            length: number;
            listen: () => () => undefined;
            location: undefined;
            push: (a: any) => any;
            replace: (a: any) => any;
        };
        onFocusChanged: () => any;
        setAdStateKey: (a: any) => any;
    }[];
}])[];
export declare const extractLikedPlaylistTreeRecur: (leaf: PoF) => Promise<PersonalFolder | PersonalPlaylist | LikedPlaylist>;
export {};
