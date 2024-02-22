import { createRegisterTransform } from "./transforms/transform.js";
import { readJSON } from "./util.js";
import { _ } from "./deps.js";
class NamespacedStorage {
    constructor(name) {
        this.name = name;
    }
    getNamespacedKey(key) {
        return `module:${this.name}:${key}`;
    }
    getItem(keyName) {
        return localStorage.getItem(this.getNamespacedKey(keyName));
    }
    setItem(keyName, keyValue) {
        return localStorage.setItem(this.getNamespacedKey(keyName), keyValue);
    }
    removeItem(keyName) {
        return localStorage.removeItem(this.getNamespacedKey(keyName));
    }
}
export class Module {
    constructor(name, path, metadata) {
        this.name = name;
        this.path = path;
        this.metadata = metadata;
        this.unloadJS = undefined;
        this.unloadCSS = undefined;
        this.awaitedMixins = new Array();
        this.registerTransform = createRegisterTransform(this);
        this.localStorage = new NamespacedStorage(name);
    }
    loadMixin() {
        const entry = this.metadata.entries.mixin;
        return entry && import(`${this.path}/${entry}`).then(m => m.default(this.registerTransform));
    }
    async loadJS() {
        this.unloadJS?.();
        const entry = this.metadata.entries.js;
        if (entry) {
            const fullPath = `${this.path}/${entry}`;
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
        this.unloadCSS?.();
        const entry = this.metadata.entries.css;
        if (entry) {
            const id = `${this.name}-styles`;
            const fullPath = `${this.path}/${entry}`;
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
    static async fromName(name) {
        const path = `/modules/${name}`;
        const metadata = (await readJSON(`${path}/metadata.json`));
        const statDefaultOrUndefined = (def) => fetch(def).then(_.constant(def)).catch(_.constant(undefined));
        Object.assign(metadata.entries, {
            js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
            css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
            mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
        });
        return new Module(name, path, metadata);
    }
}
export const internalModule = new Module("#internal", undefined, undefined);
const lock = (await readJSON("/modules/lock.json"));
export const modules = await Promise.all(lock.modules.map(Module.fromName));
export const modulesMap = Object.fromEntries(modules.map(m => [m.name, m]));
