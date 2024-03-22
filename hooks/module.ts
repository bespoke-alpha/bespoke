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
		js?: string;
		css?: string;
		mixin?: string;
	};
	dependencies: string[];
	spotifyVersions?: string;
}

export class Module {
	public unloadJS: (() => Promise<void>) | null = null;
	public unloadCSS: (() => void) | null = null;
	public awaitedMixins = new Array<Promise<void>>();
	private registerTransform = createRegisterTransform(this);
	private dependants = new Set<Module>();
	private mixinsEnabled = false;
	private enabled = false;
	private loading: Promise<void> | undefined;

	static registry = new Map<string, Module>();

	static INTERNAL = new Module(
		{
			name: "internal",
			tags: ["internal"],
			preview: "",
			version: "dev",
			authors: ["internal"],
			readme: "",
			entries: {},
			description: "internal",
			dependencies: [],
		},
		undefined,
		undefined,
		false,
	);

	static getModules() {
		return Array.from(Module.registry.values());
	}

	static async enableAllLoadableMixins() {
		console.time("onSpotifyPreInit");
		const modules = Module.getModules();
		await Promise.all(modules.map(module => module.shouldBeEnabled && module.enableMixins()));
		console.timeEnd("onSpotifyPreInit");
	}

	static async enableAllLoadable() {
		console.time("onSpotifyPostInit");
		const modules = Module.getModules();
		await Promise.all(modules.map(module => module.shouldBeEnabled && module.enable()));
		console.timeEnd("onSpotifyPostInit");
	}

	constructor(
		public metadata: Metadata,
		public metadataURL: string,
		public remoteMetadataURL?: string,
		private shouldBeEnabled = true,
	) {
		const identifier = this.getIdentifier();
		if (Module.registry.has(identifier)) {
			throw new Error(`A module with the same identifier "${identifier}" is already registered`);
		}

		Module.registry.set(identifier, this);
	}

	private getRelPath(rel: string) {
		return `${this.metadataURL}/../${rel}`;
	}

	private async loadMixins() {
		const entry = this.metadata.entries.mixin;
		if (!entry) {
			return;
		}

		console.time(`${this.getIdentifier()}#loadMixin`);
		const mixin = await import(this.getRelPath(entry));
		await mixin.default(this.registerTransform);
		console.timeEnd(`${this.getIdentifier()}#loadMixin`);

		console.groupCollapsed(`${this.getIdentifier()}#awaitMixins`);
		console.info(...this.awaitedMixins);
		console.groupEnd();

		console.time(`${this.getIdentifier()}#awaitMixins`);
		Promise.all(this.awaitedMixins).then(() => console.timeEnd(`${this.getIdentifier()}#awaitMixins`));
	}

	private async loadJS() {
		const entry = this.metadata.entries.js;
		if (!entry) {
			return;
		}

		console.time(`${this.getIdentifier()}#loadJS`);

		try {
			const fullPath = this.getRelPath(entry);
			const module = await import(fullPath);
			const dispose = await module.default?.(this);
			this.unloadJS = () => {
				this.unloadJS = null;
				return dispose?.() as Promise<void>;
			};
		} catch (e) {
			console.error(`Error loading ${this.getIdentifier()}:`, e);
		}

		console.timeEnd(`${this.getIdentifier()}#loadJS`);
	}

	private loadCSS() {
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
				this.unloadCSS = null;
				document.getElementById(id)?.remove();
			};
		}
	}

	static async fromVault({ enabled, metadata: metadataURL, remoteMetadata: remoteMetadataURL }: VaultModule) {
		const metadata: Metadata = await fetchJSON(metadataURL);
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

	private canEnable(mustToggle, mixinPhase = false) {
		if (!this.shouldBeEnabled) {
			return false;
		}
		if (!mixinPhase && !this.mixinsEnabled && this.metadata.entries.mixin) {
			return false;
		}
		if (!this.enabled) {
			// !this.enabling
			for (const dependency of this.metadata.dependencies) {
				const module = Module.registry.get(dependency);
				if (!module?.canEnable(false, mixinPhase)) {
					return false;
				}
			}
		} else if (mustToggle) {
			return false;
		}
		return true;
	}

	private async enableMixinsRecur() {
		if (this.mixinsEnabled) {
			return; // this.loadingMixins
		}
		this.mixinsEnabled = true;

		await Promise.all(
			this.metadata.dependencies.map(dependency => {
				const module = Module.registry.get(dependency);
				return module.enableMixinsRecur();
			}),
		);

		await this.loadMixins();
	}

	private async enableRecur(send = false) {
		if (this.enabled) {
			return this.loading;
		}
		this.enabled = true;
		let finishLoading: () => void;
		this.loading = new Promise(res => {
			finishLoading = res;
		});

		await Promise.all(
			this.metadata.dependencies.map(dependency => {
				const module = Module.registry.get(dependency);
				return module.enableRecur(send);
			}),
		);

		send && ModuleManager.enable(this.getIdentifier());
		await this.loadCSS();
		await this.loadJS();

		finishLoading();
		this.loading = undefined;
	}

	private canDisable(mustToggle = false) {
		if (this.enabled) {
			for (const dependant of this.dependants) {
				if (!dependant.canDisable()) {
					return false;
				}
			}
		} else if (mustToggle) {
			return false;
		}
		return true;
	}

	private async disableRecur(send = false) {
		if (!this.enabled) {
			return this.loading;
		}
		this.enabled = false;
		let finishLoading: () => void;
		this.loading = new Promise(res => {
			finishLoading = res;
		});

		await Promise.all(Array.from(this.dependants).map(dependant => dependant.disableRecur()));

		send && ModuleManager.disable(this.getIdentifier());
		await this.unloadCSS?.();
		await this.unloadJS?.();
		finishLoading();
		this.loading = undefined;
	}

	async enableMixins() {
		if (this.canEnable(true, true)) {
			await this.enableMixinsRecur();
			return true;
		}

		console.warn("Can't enable mixins for", this.getIdentifier(), ", reason: Dependencies not met");
		return false;
	}

	async enable(send = false) {
		if (this.canEnable(true)) {
			await this.enableRecur(send);
			return true;
		}

		console.warn("Can't enable", this.getIdentifier(), ", reason: Dependencies not met");
		return false;
	}

	async disable(send = false) {
		if (this.canDisable(true)) {
			await this.disableRecur(send);
			return true;
		}

		console.warn("Can't disable", this.getIdentifier(), ", reason: Module required by enabled dependencies");
		return false;
	}

	async dispose(send = false) {
		await this.disable();
		for (const dependency of this.metadata.dependencies) {
			const module = Module.registry.get(dependency);
			module.dependants.delete(this);
		}
		Module.registry.delete(this.getIdentifier());
		send && ModuleManager.remove(this.getIdentifier());
	}

	isEnabled() {
		return this.enabled;
	}
}

const bespokeProtocol = "https://bespoke-proxy.delusoire.workers.dev/protocol/";
const bespokeScheme = "bespoke:";

export const ModuleManager = {
	add: (murl: string) => {
		open(`${bespokeProtocol}${bespokeScheme}add:${murl}`);
	},
	remove: (identifier: string) => {
		open(`${bespokeProtocol}${bespokeScheme}remove:${identifier}`);
	},
	enable: (identifier: string) => {
		open(`${bespokeProtocol}${bespokeScheme}enable:${identifier}`);
	},
	disable: (identifier: string) => {
		open(`${bespokeProtocol}${bespokeScheme}disable:${identifier}`);
	},
};

const lock: Vault = await fetchJSON("/modules/vault.json");
await Promise.all(Object.values(lock.modules).map(Module.fromVault));
