import { createRegisterTransform } from "./transforms/transform.js";
import { readJSON } from "./util.js";

interface VaultModule {
	enabled: boolean;
	identifier: string;
	remoteMeta?: string;
}

type Vault = {
	modules: VaultModule[];
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

	static registry = new Map<string, Module>();

	static INTERNAL = new Module(undefined, undefined);

	static getModules() {
		return Array.from(Module.registry.values()).sort((a, b) => b.priority - a.priority);
	}

	static onSpotifyPreInit() {
		const modules = Module.getModules();
		return modules.reduce((p, module) => p.then(() => module.loadMixin()), Promise.resolve());
	}

	static onSpotifyPostInit() {
		const modules = Module.getModules();
		for (const module of modules) module.loadCSS();
		return modules.reduce((p, module) => p.then(() => module.loadJS()), Promise.resolve());
	}

	private constructor(
		private relPath: string,
		public metadata: Metadata,
		private enabled = true,
		public remoteMeta?: string,
	) {
		const identifier = this.getIdentifier();
		if (Module.registry.has(identifier)) {
			throw new Error(`A module with the same identifier "${identifier}" is already registered!`);
		}

		Module.registry.set(identifier, this);
	}

	private incPriority() {
		this.priority++;
		this.metadata.dependencies.map(dep => {
			const module = Module.registry.get(dep);
			if (module) {
				module.incPriority();
			} else {
				console.info("Disabling", this.getIdentifier(), "for lack of dependency:", dep);
				this.enabled = false;
			}
		});
	}

	private loadMixin() {
		if (!this.enabled) return;
		const entry = this.metadata.entries.mixin;
		return entry && (import(`${this.relPath}/${entry}`).then(m => m.default(this.registerTransform)) as Promise<void>);
	}

	async loadJS() {
		if (!this.enabled) return;
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
				return module.dispose?.() as Promise<void>;
			};
		}
	}

	private loadCSS() {
		if (!this.enabled) return;
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

	static async fromVault({ enabled = true, identifier, remoteMeta }: VaultModule) {
		const path = `/modules/${identifier}`;

		const metadata: Metadata = await readJSON(`${path}/metadata.json`);

		const statDefaultOrUndefined = (def: string) =>
			fetch(def)
				.then(() => def)
				.catch(() => undefined);

		Object.assign(metadata.entries, {
			js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
			css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
			mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
		});

		return new Module(path, metadata, enabled, remoteMeta);
	}

	private getAuthor() {
		return this.metadata.authors[0];
	}

	private getName() {
		return this.metadata.name;
	}

	getIdentifier() {
		return `${this.getAuthor()}/${this.getName()}`;
	}

	enable() {
		if (this.enabled) return;
		this.loadMixin();
		this.loadCSS();
		this.loadJS();
		this.enabled = true;
		ModuleManager.enable(this.relPath);
	}

	disable() {
		if (!this.enabled) return;
		this.unloadCSS();
		this.unloadJS();
		this.enabled = false;
	}
}

export const ModuleManager = {
	add: (murl: string) => {
		open(`bespoke:add:${murl}`);
	},
	remove: (identifier: string) => {
		open(`bespole:remove:${identifier}`);
	},
	enable: (identifier: string) => {
		open(`bespoke:enable:${identifier}`);
	},
	disable: (identifier: string) => {
		open(`bespoke:disable:${identifier}`);
	},
};

const lock: Vault = await readJSON("/modules/vault.json");
export const modules = await Promise.all(lock.modules.map(mod => Module.fromVault(mod)));

for (const module of modules) {
	module.incPriority();
}
