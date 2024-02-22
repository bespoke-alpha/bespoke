import { createRegisterTransform } from "./transforms/transform.js";
import { readJSON } from "./util.js";
import { _ } from "./deps.js";

type Lock = { modules: string[] };

type Metadata = {
	name: string;
	version: string;
	description: string;
	tags: string[];
	entries: {
		js?: string | false;
		css?: string | false;
		mixin?: string | false;
	};
	dependencies: string[];
	spotifyVersions: string;
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

export class Module {
	public unloadJS: (() => Promise<void>) | undefined = undefined;
	public unloadCSS: (() => void) | undefined = undefined;
	public localStorage: NamespacedStorage;
	public awaitedMixins = new Array<Promise<void>>();
	private registerTransform = createRegisterTransform(this);

	constructor(
		public name: string,
		public path: string,
		public metadata: Metadata,
	) {
		this.localStorage = new NamespacedStorage(name);
	}

	loadMixin() {
		const entry = this.metadata.entries.mixin;
		return entry && (import(`${this.path}/${entry}`).then(m => m.default(this.registerTransform)) as Promise<void>);
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
				return module.dispose?.() as Promise<void>;
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

	static async fromName(name: string) {
		const path = `/modules/${name}`;

		const metadata = (await readJSON(`${path}/metadata.json`)) as Metadata;

		const statDefaultOrUndefined = (def: string) => fetch(def).then(_.constant(def)).catch(_.constant(undefined));

		Object.assign(metadata.entries, {
			js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
			css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
			mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
		});

		return new Module(name, path, metadata);
	}
}

export const internalModule = new Module("#internal", undefined, undefined);

const lock = (await readJSON("/modules/lock.json")) as Lock;
export const modules = await Promise.all(lock.modules.map(Module.fromName));
export const modulesMap = Object.fromEntries(modules.map(m => [m.name, m] as const));
