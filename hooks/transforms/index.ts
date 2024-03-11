import { Module } from "../module.js";
import { Paths } from "../static.js";
import { matchLast } from "../util.js";
import { createRegisterTransform, sources } from "./transform.js";

export const internalRegisterTransform = createRegisterTransform(Module.INTERNAL);

internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/(([\w_\$][\w_\$\d]*)=([\w_\$][\w_\$\d]*)\.p\+\3\.u\([\w_\$][\w_\$\d]*\))/, "$1,$2=await __applyTransforms($2)");
		const i = str.search('"Loading chunk "');
		const { index } = matchLast(str.slice(0, i), /=\([\w_\$][\w_\$\d]*,[\w_\$][\w_\$\d]*\)=>\{/g);
		str = `${str.slice(0, index! + 1)}async${str.slice(index! + 1)}`;

		str = str.replace(
			/(new Promise\(\()(\([\w_\$][\w_\$\d]*,[\w_\$][\w_\$\d]*\)=>\{var ([\w_\$][\w_\$\d]*)=([\w_\$][\w_\$\d]*)\.miniCssF\([\w_\$][\w_\$\d]*\),([\w_\$][\w_\$\d]*)=\4\.p\+\3)/,
			"$1async$2,$5=await __applyTransforms($5)",
		);

		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/(\("[^"]+sentry.io)/, ",$1");
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

export const applyTransforms = (path: string) => {
	const i = Paths.indexOf(path as any);
	const source = sources[i];
	console.info(source, path);
	if (!source) return path;
	return source.getObjectURL();
};
globalThis.__applyTransforms = applyTransforms;
