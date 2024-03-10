const dir = Bun.argv[2] ?? ".";
const { stdout } = Bun.spawn(["sass.cmd", "--no-source-map", "--no-color", "--no-unicode", "--watch", dir]);
const reader = stdout.getReader();
const decoder = new TextDecoder();

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
				const match = line.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\] .* to (?<file>.*)\./);
				if (!match) continue;
				const relfilepath = match.groups.file;
				await applyCssMapPerFile(relfilepath);
				sendReloadDocument();
				continue;
			}

			lineBuffer += char;
		}
	}
	if (done) break;
}
