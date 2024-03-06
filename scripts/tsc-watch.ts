const { stdout } = Bun.spawn(["tsc.cmd", "--noResolve", "--watch", "--listEmittedFiles"]);
const reader = stdout.getReader();
const decoder = new TextDecoder();

import path from "node:path";

import { applyCssMapPerFile } from "./css-map";
import { sendReloadDocument } from "./devtools-ws";

while (true) {
	const { done, value } = await reader.read();
	{
		const lines = decoder.decode(value).split("\n");
		for await (const line of lines) {
			const cleanLine = line.replace(/[^ -~]+/g, "");
			const match = cleanLine.match(/^TSFILE: (.*)/);
			if (!match) continue;
			const relfilepath = path.relative(process.cwd(), match[1]);
			await applyCssMapPerFile(relfilepath);
			sendReloadDocument();
		}
	}
	if (done) break;
}
