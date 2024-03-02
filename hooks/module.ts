import { createRegisterTransform } from "./transforms/transform.js";
import { readJSON } from "./util.js";

type Vault = {
	modules: Array<{
		metadataURL: string;
		identifier: string;
		enabled: boolean;
	}>;
};

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

export class Module {
	public unloadJS: (() => Promise<void>) | undefined = undefined;
	public unloadCSS: (() => void) | undefined = undefined;
	public awaitedMixins = new Array<Promise<void>>();
	private registerTransform = createRegisterTransform(this);
	private priority = 0;

	constructor(
		public path: string,
		public metadata: Metadata,
		private enabled = true,
	) {}

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
				this.enabled = false;
			}
		});
	}

	loadMixin() {
		if (!this.enabled) return;
		const entry = this.metadata.entries.mixin;
		return entry && (import(`${this.path}/${entry}`).then(m => m.default(this.registerTransform)) as Promise<void>);
	}

	async loadJS() {
		if (!this.enabled) return;
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
		if (!this.enabled) return;
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

	static async fromRelPath(relPath: string, enabled = true) {
		const path = `/modules/${relPath}`;

		const metadata = (await readJSON(`${path}/metadata.json`)) as Metadata;

		const statDefaultOrUndefined = (def: string) =>
			fetch(def)
				.then(() => def)
				.catch(() => undefined);

		Object.assign(metadata.entries, {
			js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
			css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
			mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
		});

		return new Module(path, metadata, enabled);
	}

	getAuthor() {
		return this.metadata.authors[0];
	}

	getName() {
		return this.metadata.name;
	}

	getIdentifier() {
		return `${this.getAuthor()}/${this.getName()}`;
	}
}

export const internalModule = new Module(undefined, undefined);

const lock = (await readJSON("/modules/vault.json")) as Vault;
export const modules = await Promise.all(lock.modules.map(mod => Module.fromRelPath(mod.identifier, mod.enabled)));
export const modulesMap = Object.fromEntries(modules.map(m => [m.getIdentifier(), m] as const));

for (const module of modules) {
	module.incPriority();
}

modules.sort((a, b) => b.getPriority() - a.getPriority());
