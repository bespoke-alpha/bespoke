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
        entries: {},
        description: "internal",
        dependencies: [],
    }, undefined, undefined, false); }
    static getModules() {
        return Array.from(Module.registry.values());
    }
    static async enableAllLoadableMixins() {
        console.time("onSpotifyPreInit");
        const modules = Module.getModules();
        await Promise.all(modules.map(module => module.shouldBeEnabled && module.enableMixins()));
        console.timeEnd("onSpotifyPreInit");
    }
    static async enableAllLoadable() {
        console.time("onSpotifyPostInit");
        const modules = Module.getModules();
        await Promise.all(modules.map(module => module.shouldBeEnabled && module.enable()));
        console.timeEnd("onSpotifyPostInit");
    }
    constructor(metadata, metadataURL, remoteMetadataURL, shouldBeEnabled = true) {
        this.metadata = metadata;
        this.metadataURL = metadataURL;
        this.remoteMetadataURL = remoteMetadataURL;
        this.shouldBeEnabled = shouldBeEnabled;
        this.unloadJS = null;
        this.unloadCSS = null;
        this.awaitedMixins = new Array();
        this.registerTransform = createRegisterTransform(this);
        this.dependants = new Set();
        this.mixinsEnabled = false;
        this.enabled = false;
        const identifier = this.getIdentifier();
        if (Module.registry.has(identifier)) {
            throw new Error(`A module with the same identifier "${identifier}" is already registered`);
        }
        Module.registry.set(identifier, this);
    }
    getRelPath(rel) {
        return `${this.metadataURL}/../${rel}`;
    }
    async loadMixins() {
        const entry = this.metadata.entries.mixin;
        if (!entry) {
            return;
        }
        console.time(`${this.getIdentifier()}#loadMixin`);
        const mixin = await import(this.getRelPath(entry));
        await mixin.default(this.registerTransform);
        console.timeEnd(`${this.getIdentifier()}#loadMixin`);
        console.groupCollapsed(`${this.getIdentifier()}#awaitMixins`);
        console.info(...this.awaitedMixins);
        console.groupEnd();
        console.time(`${this.getIdentifier()}#awaitMixins`);
        Promise.all(this.awaitedMixins).then(() => console.timeEnd(`${this.getIdentifier()}#awaitMixins`));
    }
    async loadJS() {
        const entry = this.metadata.entries.js;
        if (!entry) {
            return;
        }
        this.unloadJS = async () => {
            this.unloadJS = null;
        };
        console.time(`${this.getIdentifier()}#loadJS`);
        try {
            const fullPath = this.getRelPath(entry);
            const module = await import(fullPath);
            const dispose = await module.default?.(this);
            const unloadJS = this.unloadJS;
            this.unloadJS = async () => {
                await dispose?.();
                await unloadJS();
            };
        }
        catch (e) {
            this.unloadJS();
            console.error(`Error loading ${this.getIdentifier()}:`, e);
        }
        console.timeEnd(`${this.getIdentifier()}#loadJS`);
    }
    loadCSS() {
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
                this.unloadCSS = null;
                document.getElementById(id)?.remove();
            };
        }
    }
    static async fromVault({ enabled, metadata: metadataURL, remoteMetadata: remoteMetadataURL }) {
        const metadata = await fetchJSON(metadataURL);
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
    canEnable(mixinPhase = false, forceEnable = false) {
        if (!forceEnable && !this.shouldBeEnabled) {
            return false;
        }
        if (!mixinPhase && !this.mixinsEnabled && this.metadata.entries.mixin) {
            return false;
        }
        if (!this.enabled) {
            // !this.enabling
            for (const dependency of this.metadata.dependencies) {
                const module = Module.registry.get(dependency);
                if (!module?.canEnable(mixinPhase)) {
                    return false;
                }
            }
        }
        return true;
    }
    async enableMixinsRecur() {
        if (this.mixinsEnabled) {
            return this.loading;
        }
        this.mixinsEnabled = true;
        let finishLoading;
        this.loading = new Promise(res => {
            finishLoading = res;
        });
        await Promise.all(this.metadata.dependencies.map(dependency => {
            const module = Module.registry.get(dependency);
            module.dependants.add(this);
            return module.enableMixinsRecur();
        }));
        await this.loadMixins();
        finishLoading();
        this.loading = undefined;
    }
    async enableRecur(send = false) {
        if (this.enabled) {
            return this.loading;
        }
        this.enabled = true;
        let finishLoading;
        this.loading = new Promise(res => {
            finishLoading = res;
        });
        await Promise.all(this.metadata.dependencies.map(dependency => {
            const module = Module.registry.get(dependency);
            return module.enableRecur(send);
        }));
        send && ModuleManager.enable(this.getIdentifier());
        await this.loadCSS();
        await Promise.all(this.awaitedMixins);
        await this.loadJS();
        finishLoading();
        this.loading = undefined;
    }
    canDisable() {
        if (this.enabled) {
            for (const dependant of this.dependants) {
                if (!dependant.canDisable()) {
                    return false;
                }
            }
        }
        return true;
    }
    async disableRecur(send = false) {
        if (!this.enabled) {
            return this.loading;
        }
        this.enabled = false;
        let finishLoading;
        this.loading = new Promise(res => {
            finishLoading = res;
        });
        await Promise.all(Array.from(this.dependants).map(dependant => dependant.disableRecur()));
        send && ModuleManager.disable(this.getIdentifier());
        await this.unloadCSS?.();
        await this.unloadJS?.();
        finishLoading();
        this.loading = undefined;
    }
    async enableMixins() {
        if (this.mixinsEnabled) {
            await this.loading;
            return false;
        }
        if (this.canEnable(true)) {
            await this.enableMixinsRecur();
            return true;
        }
        console.warn("Can't enable mixins for", this.getIdentifier(), " reason: Dependencies not met");
        return false;
    }
    async enable(send = false, forceEnable = false) {
        if (this.enabled) {
            await this.loading;
            return false;
        }
        if (this.canEnable(false, forceEnable)) {
            await this.enableRecur(send);
            return true;
        }
        console.warn("Can't enable", this.getIdentifier(), " reason: Dependencies not met");
        return false;
    }
    async disable(send = false) {
        if (!this.enabled) {
            await this.loading;
            return false;
        }
        if (this.canDisable()) {
            await this.disableRecur(send);
            return true;
        }
        console.warn("Can't disable", this.getIdentifier(), " reason: Module required by enabled dependencies");
        return false;
    }
    async dispose(send = false) {
        await this.disable();
        for (const dependency of this.metadata.dependencies) {
            const module = Module.registry.get(dependency);
            module.dependants.delete(this);
        }
        Module.registry.delete(this.getIdentifier());
        send && ModuleManager.remove(this.getIdentifier());
    }
    isEnabled() {
        return this.enabled;
    }
}
const bespokeProtocol = "https://bespoke-proxy.delusoire.workers.dev/protocol/";
const bespokeScheme = "bespoke:";
let fallback = false;
const ws = new WebSocket("ws://localhost:7967/protocol");
ws.onclose = () => {
    fallback = true;
};
const sendProtocolMessage = (message) => {
    if (fallback) {
        open(bespokeProtocol + message);
    }
    else {
        ws.send(message);
    }
};
export const ModuleManager = {
    add: (murl) => {
        sendProtocolMessage(`${bespokeScheme}add:${murl}`);
    },
    remove: (identifier) => {
        sendProtocolMessage(`${bespokeScheme}remove:${identifier}`);
    },
    enable: (identifier) => {
        sendProtocolMessage(`${bespokeScheme}enable:${identifier}`);
    },
    disablsendProtocolMessagee: (identifier) => {
        open(`${bespokeScheme}disable:${identifier}`);
    },
};
const lock = await fetchJSON("/modules/vault.json");
await Promise.all(Object.values(lock.modules).map(Module.fromVault));
