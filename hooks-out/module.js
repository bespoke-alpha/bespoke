import { createRegisterTransform } from "./transforms/transform.js";
import { fetchJSON } from "./util.js";
export class Module {
    static { this.registry = new Map(); }
    static { this.INTERNAL = new Module(undefined, {
        name: "internal",
        tags: ["internal"],
        preview: "",
        version: "dev",
        authors: ["internal"],
        entries: {
            js: false,
            css: false,
            mixin: false,
        },
        description: "internal",
        dependencies: [],
    }); }
    static getModules() {
        return Array.from(Module.registry.values()).sort((a, b) => b.priority - a.priority);
    }
    static onModulesLoaded() {
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
    constructor(relPath, metadata, enabled = true, remoteMeta) {
        this.relPath = relPath;
        this.metadata = metadata;
        this.enabled = enabled;
        this.remoteMeta = remoteMeta;
        this.unloadJS = undefined;
        this.unloadCSS = undefined;
        this.awaitedMixins = new Array();
        this.registerTransform = createRegisterTransform(this);
        this.priority = 0;
        const identifier = this.getIdentifier();
        if (Module.registry.has(identifier)) {
            throw new Error(`A module with the same identifier "${identifier}" is already registered!`);
        }
        Module.registry.set(identifier, this);
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
    loadMixin() {
        if (!this.enabled)
            return;
        const entry = this.metadata.entries.mixin;
        return entry && import(`${this.relPath}/${entry}`).then(m => m.default(this.registerTransform));
    }
    async loadJS() {
        if (!this.enabled)
            return;
        this.unloadJS?.();
        const entry = this.metadata.entries.js;
        if (entry) {
            const fullPath = `${this.relPath}/${entry}`;
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
            const fullPath = `${this.relPath}/${entry}`;
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
    static async fromVault({ enabled = true, identifier, remoteMeta }) {
        const path = `/modules/${identifier}`;
        const metadata = await fetchJSON(`${path}/metadata.json`);
        const statDefaultOrUndefined = (def) => fetch(def)
            .then(() => def)
            .catch(() => undefined);
        Object.assign(metadata.entries, {
            js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
            css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
            mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
        });
        return new Module(path, metadata, enabled, remoteMeta);
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
    enable() {
        if (this.enabled)
            return;
        this.loadMixin();
        this.loadCSS();
        this.loadJS();
        this.enabled = true;
        ModuleManager.enable(this.relPath);
    }
    disable() {
        if (!this.enabled)
            return;
        this.unloadCSS();
        this.unloadJS();
        this.enabled = false;
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
await Promise.all(lock.modules.map(mod => Module.fromVault(mod)));
Module.onModulesLoaded();
