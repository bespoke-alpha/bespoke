export * from "./static.js";

import { S as _S } from "./expose/expose.js";
export const S = _S;

import { Module } from "/hooks/module.js";
import { Registrar } from "./registers/registers.js";

export const createRegistrar = (mod: Module & { registrar?: Registrar }) => {
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
	constructor(private name: string) {}

	private getNamespacedKey(key: string) {
		return `module:${this.name}:${key}`;
	}

	getItem(keyName: string) {
		return localStorage.getItem(this.getNamespacedKey(keyName));
	}

	setItem(keyName: string, keyValue: string) {
		return localStorage.setItem(this.getNamespacedKey(keyName), keyValue);
	}

	removeItem(keyName: string) {
		return localStorage.removeItem(this.getNamespacedKey(keyName));
	}
}

export const createStorage = <M extends Module>(mod: M & { storage?: NamespacedStorage }) =>
	(mod.storage ??= new NamespacedStorage(mod.getIdentifier()));

console.log();

export class NamespacedLogger {
	constructor(private name: string) {}

	log(...data: any[]) {
		return console.log(`[${this.name}]`, ...data);
	}
}

export const createLogger = (mod: Module & { logger?: NamespacedLogger }) => (mod.logger ??= new NamespacedLogger(mod.getIdentifier()));

class Event<A> {
	callbacks = new Array<(a: A) => void>();
	constructor(private getArg: () => A) {}

	on(callback) {
		callback(this.getArg());
		this.callbacks.push(callback);
	}
	fire() {
		const arg = this.getArg();
		for (const callback of this.callbacks) callback(arg);
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
	if (state?.item?.uri !== cachedState?.item?.uri) Events.Player.songchanged.fire();
	if (state?.isPaused !== cachedState?.isPaused) Events.Player.update.fire();
	cachedState = state;
});
