export * from "./static.js";

import { S as _S } from "./expose/expose.js";
export const S = _S;

import { Module } from "/hooks/module.js";
import { Registrar } from "./registers/registers.js";

export const extendRegistrar = <M extends Module>(_module: M) => {
	const module = Object.assign(_module, {
		registrar: new Registrar(_module.getIdentifier()),
	});
	const unloadJS = module.unloadJS;
	module.unloadJS = () => {
		module.registrar.dispose();
		return unloadJS();
	};
	return module;
};

class NamespacedStorage {
	constructor(public name: string) {}

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

export const getLocalStorage = <M extends Module>(_module: M) => {
	const module = Object.assign(_module, {
		localStorage: new NamespacedStorage(_module.getIdentifier()),
	});
	return module;
};

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
