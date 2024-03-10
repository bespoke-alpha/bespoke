import fs from "node:fs/promises";
import path from "node:path";
import postcss from "postcss";

const transpiler = new Bun.Transpiler({});
const PostCSSProcessor = await postcss.default([]);

async function buildJS(file: string) {
	const buffer = await Bun.file(file).toString();
	const js = transpiler.transform(buffer);
	return js;
}

async function buildCSS(file: string) {
	const buffer = await Bun.file(file).toString();
	const { css } = PostCSSProcessor.process(buffer, { from: file });
	return css;
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
	return await Bun.write(dest, content);
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
