export declare const backup: (silent?: boolean) => Promise<void>;
export declare enum RestoreScope {
    LIBRARY = "library",
    LOCALSTORAGE = "localstorage",
    SETTINGS = "settings"
}
export declare const restoreFactory: (mode: RestoreScope) => () => Promise<void>;
