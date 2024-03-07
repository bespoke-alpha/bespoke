import { createRegisterTransform } from "./transforms/transform.js";
import { fetchJSON } from "./util.js";

interface VaultModule {
	enabled: boolean;
	remoteMeta?: string;
}

interface Vault {
	modules: Record<string, VaultModule>;
}

export interface Metadata {
	name: string;
	tags: string[];
	preview: string;
	version: string;
	authors: string[];
	description: string;
	entries: {
		js?: string | false;
		css?: string | false;
		mixin?: string | false;
	};
	dependencies: string[];
	spotifyVersions?: string;
}

export class Module {
	public unloadJS: (() => Promise<void>) | undefined = undefined;
	public unloadCSS: (() => void) | undefined = undefined;
	public awaitedMixins = new Array<Promise<void>>();
	private registerTransform = createRegisterTransform(this);
	private priority = 0;

	static registry = new Map<string, Module>();

	static INTERNAL = new Module(undefined, {
		name: "internal",
		tags: ["internal"],
		preview: "",
		version: "dev",
		authors: ["internal"],
		entries: {
			js: false,
			css: false,
			mixin: false,
		},
		description: "internal",
		dependencies: [],
	});

	static getModules() {
		return Array.from(Module.registry.values()).sort((a, b) => b.priority - a.priority);
	}

	static onModulesLoaded() {
		for (const module of Module.registry.values()) {
			module.incPriority();
		}
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

	private async loadJS() {
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

	static async fromVault(identifier: string, { enabled = true, remoteMeta }: VaultModule) {
		const path = `/modules/${identifier}`;

		const metadata: Metadata = await fetchJSON(`${path}/metadata.json`);

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

	getLocalMeta() {
		return `/modules/${this.getIdentifier()}/metadata.json`;
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
		ModuleManager.enable(this.getIdentifier());
	}

	disable() {
		if (!this.enabled) return;
		this.unloadCSS();
		this.unloadJS();
		this.enabled = false;
		ModuleManager.disable(this.getIdentifier());
	}

	isEnabled() {
		return this.enabled;
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

const lock: Vault = await fetchJSON("/modules/vault.json");
await Promise.all(Object.entries(lock.modules).map(([identifier, mod]) => Module.fromVault(identifier, mod)));
Module.onModulesLoaded();
