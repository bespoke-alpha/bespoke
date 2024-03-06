import type { Module } from "../module.js";
import { Paths } from "../static.js";
import { fetchText } from "../util.js";

export class SourceFile {
	objectURL?: string;
	transforms = new Array<(input: string) => string>();
	constructor(public path: string) {}

	mixin(transform: (input: string) => string) {
		this.transforms.push(transform);
	}

	async getObjectURL() {
		if (this.objectURL) return this.objectURL;
		const content = await fetchText(this.path);
		const modifiedContent = this.transforms.reduce((p, transform) => transform(p), content);
		const [ext] = this.path.match(/\..+$/) ?? [];
		const types = {
			".js": "application/javascript",
			".css": "text/css",
		};
		const type = types[ext as keyof typeof types];
		const blob = new Blob([modifiedContent], { type });
		this.objectURL = URL.createObjectURL(blob);
		return this.objectURL;
	}
}

export const sources = Paths.map(path => new SourceFile(path));

export type Thunk<A> = (value: A) => void;
export type MixinProps<A> = {
	transform: (emit: Thunk<A>) => (input: string) => string;
	then?: (emitted: A) => void;
	glob: RegExp;
	noAwait?: boolean;
};
export type RegisterTransformFN = ReturnType<typeof createRegisterTransform>;

export const createRegisterTransform =
	(module: Module) =>
	<A = void>({ transform, then = () => {}, glob, noAwait = false }: MixinProps<A>) => {
		const p = new Promise<A>(resolve => {
			const _sources = Paths.map((path, i) => glob.test(path) && sources[i]).filter(Boolean) as SourceFile[];
			for (const source of _sources) {
				source.mixin(transform(resolve));
			}
		}).then(then);
		// @ts-ignore
		p.transform = transform;
		noAwait || module.awaitedMixins.push(p);
	};
