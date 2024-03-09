interface VaultModule {
    enabled: boolean;
    metadata: string;
    remoteMetadata?: string;
}
export interface Metadata {
    name: string;
    tags: string[];
    preview: string;
    version: string;
    authors: string[];
    description: string;
    readme: string;
    entries: {
        js?: string | false;
        css?: string | false;
        mixin?: string | false;
    };
    dependencies: string[];
    spotifyVersions?: string;
}
export declare class Module {
    metadata: Metadata;
    metadataURL: string;
    remoteMetadataURL?: string;
    private enabled;
    unloadJS: (() => Promise<void>) | undefined;
    unloadCSS: (() => void) | undefined;
    awaitedMixins: Promise<void>[];
    private registerTransform;
    private priority;
    static registry: Map<string, Module>;
    static INTERNAL: Module;
    static getModules(): Module[];
    static onModulesRegistered(): void;
    static onSpotifyPreInit(): Promise<void>;
    static onSpotifyPostInit(): Promise<void>;
    constructor(metadata: Metadata, metadataURL: string, remoteMetadataURL?: string, enabled?: boolean);
    private incPriority;
    private getRelPath;
    private loadMixin;
    private loadJS;
    private loadCSS;
    static fromVault({ enabled, metadata: metadataURL, remoteMetadata: remoteMetadataURL }: VaultModule): Promise<Module>;
    getAuthor(): string;
    getName(): string;
    getLocalMeta(): string;
    getIdentifier(): string;
    enable(send?: boolean): void;
    disable(send?: boolean): void;
    dispose(send?: boolean): void;
    isEnabled(): boolean;
}
export declare const ModuleManager: {
    add: (murl: string) => void;
    remove: (identifier: string) => void;
    enable: (identifier: string) => void;
    disable: (identifier: string) => void;
};
export {};
