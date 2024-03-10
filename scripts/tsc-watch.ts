const dir = Bun.argv[2] ?? ".";
const { stdout } = Bun.spawn(["tsc.cmd", "--pretty", "false", "--noResolve", "--watch", "--listEmittedFiles", "--project", dir]);
const reader = stdout.getReader();
const decoder = new TextDecoder();

import path from "node:path";

import { applyCssMapPerFile } from "./class-map";
import { sendReloadDocument } from "./devtools-ws";

let lineBuffer = "";
while (true) {
	const { done, value } = await reader.read();
	{
		const buffer = decoder.decode(value).replace(/[^ -~\n]+/g, "");

		for (const char of buffer) {
			if (char === "\n") {
				const line = lineBuffer;
				lineBuffer = "";
				const match = line.match(/^TSFILE: (?<file>.*)$/);
				if (!match) continue;
				const relfilepath = path.relative(process.cwd(), match.groups.file);
				await applyCssMapPerFile(relfilepath);
				sendReloadDocument();
				continue;
			}

			lineBuffer += char;
		}
	}
	if (done) break;
}
