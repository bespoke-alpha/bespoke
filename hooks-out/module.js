import { createRegisterTransform } from "./transforms/transform.js";
import { fetchJSON } from "./util.js";
export class Module {
    static { this.registry = new Map(); }
    static { this.INTERNAL = new Module({
        name: "internal",
        tags: ["internal"],
        preview: "",
        version: "dev",
        authors: ["internal"],
        readme: "",
        entries: {
            js: false,
            css: false,
            mixin: false,
        },
        description: "internal",
        dependencies: [],
    }, undefined, undefined, false); }
    static getModules() {
        return Array.from(Module.registry.values()).sort((a, b) => b.priority - a.priority);
    }
    static onModulesRegistered() {
        for (const module of Module.registry.values()) {
            module.incPriority();
        }
    }
    static onSpotifyPreInit() {
        const modules = Module.getModules();
        return modules.reduce((p, module) => p.then(() => module.loadMixin()), Promise.resolve());
    }
    static onSpotifyPostInit() {
        const modules = Module.getModules();
        for (const module of modules)
            module.loadCSS();
        return modules.reduce((p, module) => p.then(() => module.loadJS()), Promise.resolve());
    }
    constructor(metadata, metadataURL, remoteMetadataURL, enabled = true) {
        this.metadata = metadata;
        this.metadataURL = metadataURL;
        this.remoteMetadataURL = remoteMetadataURL;
        this.enabled = enabled;
        this.unloadJS = undefined;
        this.unloadCSS = undefined;
        this.awaitedMixins = new Array();
        this.registerTransform = createRegisterTransform(this);
        this.priority = 0;
        const identifier = this.getIdentifier();
        if (Module.registry.has(identifier)) {
            throw new Error(`A module with the same identifier "${identifier}" is already registered`);
        }
        const registry = new Map(Module.registry);
        registry.set(identifier, this);
        Module.registry = registry;
    }
    incPriority() {
        this.priority++;
        this.metadata.dependencies.map(dep => {
            const module = Module.registry.get(dep);
            if (module) {
                module.incPriority();
            }
            else {
                console.info("Disabling", this.getIdentifier(), "for lack of dependency:", dep);
                this.enabled = false;
            }
        });
    }
    getRelPath(rel) {
        return `${this.metadataURL}/../${rel}`;
    }
    loadMixin() {
        if (!this.enabled)
            return;
        const entry = this.metadata.entries.mixin;
        return entry && import(this.getRelPath(entry)).then(m => m.default(this.registerTransform));
    }
    async loadJS() {
        if (!this.enabled)
            return;
        this.unloadJS?.();
        const entry = this.metadata.entries.js;
        if (entry) {
            const fullPath = this.getRelPath(entry);
            console.info(this.awaitedMixins, fullPath);
            await Promise.all(this.awaitedMixins);
            const module = await import(fullPath);
            module.default?.(this);
            this.unloadJS = () => {
                this.unloadJS = undefined;
                return module.dispose?.();
            };
        }
    }
    loadCSS() {
        if (!this.enabled)
            return;
        this.unloadCSS?.();
        const entry = this.metadata.entries.css;
        if (entry) {
            const id = `${this.getIdentifier()}-styles`;
            const fullPath = this.getRelPath(entry);
            const link = document.createElement("link");
            link.id = id;
            link.rel = "stylesheet";
            link.type = "text/css";
            link.href = fullPath;
            document.head.append(link);
            this.unloadCSS = () => {
                this.unloadCSS = undefined;
                document.getElementById(id)?.remove();
            };
        }
    }
    static async fromVault({ enabled, metadata: metadataURL, remoteMetadata: remoteMetadataURL }) {
        const metadata = await fetchJSON(metadataURL);
        const statDefaultOrUndefined = (def) => fetch(`${metadata}/../${def}`)
            .then(() => def)
            .catch(() => undefined);
        Object.assign(metadata.entries, {
            js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
            css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
            mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
        });
        return new Module(metadata, metadataURL, remoteMetadataURL, enabled);
    }
    getAuthor() {
        return this.metadata.authors[0];
    }
    getName() {
        return this.metadata.name;
    }
    getLocalMeta() {
        return `/modules/${this.getIdentifier()}/metadata.json`;
    }
    getIdentifier() {
        return `${this.getAuthor()}/${this.getName()}`;
    }
    enable(send = true) {
        if (this.enabled)
            return;
        this.loadMixin();
        this.loadCSS();
        this.loadJS();
        this.enabled = true;
        send && ModuleManager.enable(this.getIdentifier());
    }
    disable(send = true) {
        if (!this.enabled)
            return;
        this.unloadCSS();
        this.unloadJS();
        this.enabled = false;
        send && ModuleManager.disable(this.getIdentifier());
    }
    dispose(send = true) {
        this.disable(false);
        const registry = new Map(Module.registry);
        registry.delete(this.getIdentifier());
        Module.registry = registry;
        send && ModuleManager.remove(this.getIdentifier());
    }
    isEnabled() {
        return this.enabled;
    }
}
export const ModuleManager = {
    add: (murl) => {
        open(`bespoke:add:${murl}`);
    },
    remove: (identifier) => {
        open(`bespole:remove:${identifier}`);
    },
    enable: (identifier) => {
        open(`bespoke:enable:${identifier}`);
    },
    disable: (identifier) => {
        open(`bespoke:disable:${identifier}`);
    },
};
const lock = await fetchJSON("/modules/vault.json");
await Promise.all(Object.values(lock.modules).map(Module.fromVault));
Module.onModulesRegistered();
