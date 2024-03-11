import { createRegisterTransform } from "./transforms/transform.js";
import { fetchJSON } from "./util.js";

interface VaultModule {
	enabled: boolean;
	metadata: string;
	remoteMetadata?: string;
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
	readme: string;
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

	static INTERNAL = new Module(
		{
			name: "internal",
			tags: ["internal"],
			preview: "",
			version: "dev",
			authors: ["internal"],
			readme: "",
			entries: {
				js: false,
				css: false,
				mixin: false,
			},
			description: "internal",
			dependencies: [],
		},
		undefined,
		undefined,
		false,
	);

	static getModules() {
		return Array.from(Module.registry.values()).sort((a, b) => b.priority - a.priority);
	}

	static onModulesRegistered() {
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

	constructor(
		public metadata: Metadata,
		public metadataURL: string,
		public remoteMetadataURL?: string,
		private enabled = true,
	) {
		const identifier = this.getIdentifier();
		if (Module.registry.has(identifier)) {
			throw new Error(`A module with the same identifier "${identifier}" is already registered`);
		}

		const registry = new Map(Module.registry);
		registry.set(identifier, this);
		Module.registry = registry;
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

	private getRelPath(rel: string) {
		return `${this.metadataURL}/../${rel}`;
	}

	private loadMixin() {
		if (!this.enabled) return;
		const entry = this.metadata.entries.mixin;
		return entry && (import(this.getRelPath(entry)).then(m => m.default(this.registerTransform)) as Promise<void>);
	}

	private async loadJS() {
		if (!this.enabled) return;
		this.unloadJS?.();
		const entry = this.metadata.entries.js;
		if (entry) {
			const fullPath = this.getRelPath(entry);
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
			const fullPath = this.getRelPath(entry);
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

	static async fromVault({ enabled, metadata: metadataURL, remoteMetadata: remoteMetadataURL }: VaultModule) {
		const metadata: Metadata = await fetchJSON(metadataURL);

		const statDefaultOrUndefined = (def: string) =>
			fetch(`${metadata}/../${def}`)
				.then(() => def)
				.catch(() => undefined);

		Object.assign(metadata.entries, {
			js: metadata.entries.js ?? statDefaultOrUndefined("index.js"),
			css: metadata.entries.css ?? statDefaultOrUndefined("index.css"),
			mixin: metadata.entries.mixin ?? statDefaultOrUndefined("mixin.js"),
		});

		return new Module(metadata, metadataURL, remoteMetadataURL, enabled);
	}

	getAuthor() {
		return this.metadata.authors[0];
	}

	getName() {
		return this.metadata.name;
	}

	getLocalMeta() {
		return `/modules/${this.getIdentifier()}/metadata.json`;
	}

	getIdentifier() {
		return `${this.getAuthor()}/${this.getName()}`;
	}

	enable(send = true) {
		if (this.enabled) return;
		this.loadMixin();
		this.loadCSS();
		this.loadJS();
		this.enabled = true;
		send && ModuleManager.enable(this.getIdentifier());
	}

	disable(send = true) {
		if (!this.enabled) return;
		this.unloadCSS?.();
		this.unloadJS?.();
		this.enabled = false;
		send && ModuleManager.disable(this.getIdentifier());
	}

	dispose(send = true) {
		this.disable(false);
		const registry = new Map(Module.registry);
		registry.delete(this.getIdentifier());
		Module.registry = registry;
		send && ModuleManager.remove(this.getIdentifier());
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
await Promise.all(Object.values(lock.modules).map(Module.fromVault));
Module.onModulesRegistered();
