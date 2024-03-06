interface VaultModule {
    enabled: boolean;
    identifier: string;
    remoteMeta?: string;
}
export interface Metadata {
    name: string;
    tags: string[];
    preview: string;
    version: string;
    authors: string[];
    description: string;
    entries: {
        js?: string | false;
        css?: string | false;
        mixin?: string | false;
    };
    dependencies: string[];
    spotifyVersions?: string;
}
export declare class Module {
    private relPath;
    metadata: Metadata;
    private enabled;
    remoteMeta?: string;
    unloadJS: (() => Promise<void>) | undefined;
    unloadCSS: (() => void) | undefined;
    awaitedMixins: Promise<void>[];
    private registerTransform;
    private priority;
    static registry: Map<string, Module>;
    static INTERNAL: Module;
    static getModules(): Module[];
    static onModulesLoaded(): void;
    static onSpotifyPreInit(): Promise<void>;
    static onSpotifyPostInit(): Promise<void>;
    private constructor();
    private incPriority;
    private loadMixin;
    private loadJS;
    private loadCSS;
    static fromVault({ enabled, identifier, remoteMeta }: VaultModule): Promise<Module>;
    private getAuthor;
    private getName;
    getLocalMeta(): string;
    getIdentifier(): string;
    enable(): void;
    disable(): void;
}
export declare const ModuleManager: {
    add: (murl: string) => void;
    remove: (identifier: string) => void;
    enable: (identifier: string) => void;
    disable: (identifier: string) => void;
};
export {};
