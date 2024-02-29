export * from "./static.js";
import { S as _S } from "./expose/expose.js";
export const S = _S;
import { Registrar } from "./registers/registers.js";
export const createRegistrar = (mod) => {
    let registrar = mod.registrar;
    if (registrar) {
        return registrar;
    }
    registrar = new Registrar(mod.getIdentifier());
    const unloadJS = mod.unloadJS;
    mod.unloadJS = () => {
        mod.registrar.dispose();
        return unloadJS();
    };
    return registrar;
};
export class NamespacedStorage {
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
export const createStorage = (mod) => (mod.storage ??= new NamespacedStorage(mod.getIdentifier()));
console.log();
export class NamespacedLogger {
    constructor(name) {
        this.name = name;
    }
    log(...data) {
        return console.log(`[${this.name}]`, ...data);
    }
}
export const createLogger = (mod) => (mod.logger ??= new NamespacedLogger(mod.getIdentifier()));
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
