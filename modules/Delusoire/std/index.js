export * from "./static.js";
import { S as _S } from "./expose/expose.js";
export const S = _S;
import { Registrar } from "./registers/registers.js";
export const createRegistrar = (mod) => {
    if (!mod.registrar) {
        mod.registrar = new Registrar(mod.getIdentifier());
        const unloadJS = mod.unloadJS;
        mod.unloadJS = () => {
            mod.registrar.dispose();
            return unloadJS();
        };
    }
    return mod.registrar;
};
export const createStorage = (mod) => {
    if (!mod.storage) {
        const hookedMethods = new Set(["getItem", "setItem", "removeItem"]);
        mod.storage = new Proxy(globalThis.localStorage, {
            get(target, p, receiver) {
                if (typeof p === "string" && hookedMethods.has(p)) {
                    return (key, ...data) => target[p](`module:${mod.getIdentifier()}:${key}`, ...data);
                }
                return target[p];
            },
        });
    }
    return mod.storage;
};
export const createLogger = (mod) => {
    if (!mod.logger) {
        const hookedMethods = new Set(["debug", "error", "info", "log", "warn"]);
        mod.logger = new Proxy(globalThis.console, {
            get(target, p, receiver) {
                if (typeof p === "string" && hookedMethods.has(p)) {
                    return (...data) => target[p](`[${mod.getIdentifier()}]:`, ...data);
                }
                return target[p];
            },
        });
    }
    return mod.logger;
};
class Event {
    constructor(getArg) {
        this.getArg = getArg;
        this.callbacks = new Array();
    }
    on(callback) {
        callback(this.getArg());
        this.callbacks.push(callback);
    }
    fire() {
        const arg = this.getArg();
        for (const callback of this.callbacks)
            callback(arg);
    }
}
const PlayerAPI = S.Platform.getPlayerAPI();
const getPlayerState = () => PlayerAPI.getState();
export const Events = {
    Player: {
        update: new Event(getPlayerState),
        songchanged: new Event(getPlayerState),
    },
};
let cachedState = {};
PlayerAPI.getEvents().addListener("update", ({ data: state }) => {
    if (state?.item?.uri !== cachedState?.item?.uri)
        Events.Player.songchanged.fire();
    if (state?.isPaused !== cachedState?.isPaused)
        Events.Player.update.fire();
    cachedState = state;
});
