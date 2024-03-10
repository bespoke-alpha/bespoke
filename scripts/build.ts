import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

import tailwindcss from "tailwindcss";

import autoprefixer from "autoprefixer";

import tailwindcssNesting from "tailwindcss/nesting";

const transpiler = new Bun.Transpiler({});
const PostCSSProcessor = await postcss.default([
	tailwindcssNesting(),
	tailwindcss({
		config: {
			content: {
				relative: true,
				files: ["./modules/**/*.{tsx}"],
			},
		},
	}),
	autoprefixer({}),
]);

async function buildJS(file: string) {
	const buffer = await Bun.file(file).toString();
	const js = transpiler.transform(buffer);
	return PostCSSProcessor.process(js, { from: file });
}

async function buildCSS(file: string) {
	const buffer = await Bun.file(file).toString();
	const { css } = PostCSSProcessor.process(buffer, { from: file });
	return css;
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

async function buildFile(file: string) {
	const ext = path.extname(file);

	let dest: string;
	let content = "";
	switch (ext) {
		case "scss": {
			dest = file.replace(/\.scss$/, "");
			content = await buildCSS(file);
			break;
		}
		case "ts":
		case "tsx": {
			dest = file.replace(/\.tsx?$/, "");
			content = await buildJS(file);
			break;
		}
		default:
			return;
	}
	return await Bun.write(dest, applyClassMap(content));
}

import { Glob } from "bun";

const files = new Glob("**/*.{ts,tsx,scss}").scan("modules/");

for await (const file of files) {
	await buildFile(file);
}

const watcher = fs.watch("modules", { recursive: true });
for await (const event of watcher) {
	console.log(`${event.filename} was ${event.eventType}d`);
	await buildFile(event.filename);
}
