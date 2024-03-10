import fs from "node:fs/promises";
import path from "node:path";

import swc from "@swc/core";
import postcss from "postcss";

import atImport from "postcss-import";
import tailwindcssNesting from "tailwindcss/nesting";
import tailwindcss from "tailwindcss";
import autoprefixer from "autoprefixer";

async function transpileToJs(file: string) {
	const dest = file.replace(/\.[^\.]+$/, ".js");
	const buffer = await Bun.file(file).text();
	const { code: js } = await swc.transform(buffer, {
		filename: path.basename(file),
		sourceMaps: false,
		jsc: {
			baseUrl: ".",
			parser: {
				syntax: "typescript",
				tsx: true,
				decorators: true,
				dynamicImport: true,
			},
			transform: {
				legacyDecorator: true,
				react: {
					pragma: "S.React.createElement",
					pragmaFrag: "S.React.Fragment",
				},
			},
			target: "esnext",
			loose: false,
		},
		isModule: true,
	});
	await Bun.write(dest, applyClassMap(js));
}

async function transpileToCss(file: string, files: string[]) {
	const dest = file.replace(/\.[^\.]+$/, ".css");
	const buffer = await Bun.file(file).text();
	const PostCSSProcessor = await postcss.default([
		atImport(),
		tailwindcssNesting(),
		tailwindcss({
			config: {
				content: {
					relative: true,
					files,
				},
			},
		}),
		autoprefixer({}),
	]);
	const p = await PostCSSProcessor.process(buffer, { from: file });
	await Bun.write(dest, applyClassMap(p.css));
}

import escRegex from "lodash/escapeRegExp";
import classMap from "./util/class-map.json";

const boundary = "([^\\w\\-])";

function applyClassMap(content: string) {
	for (const [v, k] of Object.entries(classMap)) {
		content = content.replaceAll(new RegExp(boundary + escRegex(k) + boundary, "g"), `$1${v}$2`);
	}
	return content;
}

import { Glob } from "bun";

import type { Metadata } from "/hooks/module";
import { sendReloadDocument } from "./devtools-ws";

const vault = await import("/modules/vault.json");

const selectedModules = Bun.argv.slice(2);

const timeStart = Date.now();

await Promise.all(
	Object.entries(vault.modules).map(async ([identifier, { metadata: metadataPath }]) => {
		if (selectedModules.length && !selectedModules.includes(identifier)) return;
		const modulePath = path.dirname(metadataPath);
		const relativeModulePath = modulePath.slice(1);
		const metadata = (await import(metadataPath)) as Metadata;
		const toJsGlob = `${relativeModulePath}/**/*.{ts,tsx}`;
		const toJsFiles = new Glob(toJsGlob).scan(".");
		for await (const toJsFile of toJsFiles) {
			await transpileToJs(toJsFile);
		}
		const cssEntry = metadata.entries.css;
		if (cssEntry) {
			const toCssFile = path.join(relativeModulePath, cssEntry.replace(/\.css$/, ".scss"));
			await transpileToCss(toCssFile, [toJsGlob]);
		}
	}),
);

console.log(`Build finished in ${(Date.now() - timeStart) / 1000}s!`);
console.log("Watching for further changes");

const watcher = fs.watch("modules", { recursive: true });
for await (const event of watcher) {
	const { filename, eventType } = event;
	console.log(`${filename} was ${eventType}d`);
	const fullFilename = path.join("modules", filename);
	const identifier = filename.split(path.sep).slice(0, 2).join("/");
	if (selectedModules.length && !selectedModules.includes(identifier)) continue;
	switch (path.extname(filename)) {
		case ".scss": {
			const metadataPath = vault.modules[identifier].metadata;
			const modulePath = path.dirname(metadataPath);
			const relativeModulePath = modulePath.slice(1);
			const metadata = (await import(metadataPath)) as Metadata;
			const toJsGlob = `${relativeModulePath}/**/*.{ts,tsx}`;
			const cssEntry = metadata.entries.css;
			if (cssEntry) {
				const toCssFile = path.join(relativeModulePath, cssEntry.replace(/\.css$/, ".scss"));
				await transpileToCss(toCssFile, [toJsGlob]);
				sendReloadDocument();
			}
			break;
		}
		case ".ts":
		case ".tsx": {
			await transpileToJs(fullFilename);
			sendReloadDocument();
			break;
		}
	}
}
