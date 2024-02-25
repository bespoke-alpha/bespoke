import { createRegisterTransform } from "./transforms/transform.js";
import { readJSON } from "./util.js";
import { _ } from "./deps.js";

type Lock = { modules: string[] };

type Metadata = {
	name: string;
	version: string;
	authors: string[];
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
	private priority = 0;
	private disabled = false;

	constructor(
		public path: string,
		public metadata: Metadata,
	) {
		this.localStorage = new NamespacedStorage(this.getIdentifier());
	}

	getPriority() {
		return this.priority;
	}

	incPriority() {
		this.priority++;
		this.metadata.dependencies.map(dep => {
			const module = modulesMap[dep];
			if (module) {
				module.incPriority();
			} else {
				console.info("Disabling", this.getIdentifier(), "for lack of dependency:", dep);
				this.disabled = true;
			}
		});
	}

	loadMixin() {
		if (this.disabled) return;
		const entry = this.metadata.entries.mixin;
		return entry && (import(`${this.path}/${entry}`).then(m => m.default(this.registerTransform)) as Promise<void>);
	}

	async loadJS() {
		if (this.disabled) return;
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
		if (this.disabled) return;
		this.unloadCSS?.();
		const entry = this.metadata.entries.css;
		if (entry) {
			const id = `${this.getIdentifier()}-styles`;
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

	static async fromRelPath(relPath: string) {
		const path = `/modules/${relPath}`;

		const metadata = (await readJSON(`${path}/metadata.json`)) as Metadata;

		const statDefaultOrUndefined = (def: string) => fetch(def).then(_.constant(def)).catch(_.constant(undefined));

		Object.assign(metadata.entries, {
			js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
			css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
			mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
		});

		return new Module(path, metadata);
	}

	getIdentifier() {
		return `${this.metadata.authors[0]}/${this.metadata.name}`;
	}
}

export const internalModule = new Module(undefined, undefined);

const lock = (await readJSON("/modules/lock.json")) as Lock;
export const modules = await Promise.all(lock.modules.map(Module.fromRelPath)).then(modules => {
	for (const module of modules) {
		module.incPriority();
	}
	return modules.sort((a, b) => b.getPriority() - a.getPriority());
});
export const modulesMap = Object.fromEntries(modules.map(m => [m.getIdentifier(), m] as const));
