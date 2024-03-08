const dir = Bun.argv[2] ?? ".";
const { stdout } = Bun.spawn(["sass.cmd", "--no-source-map", "--no-color", "--no-unicode", "--watch", dir]);
const reader = stdout.getReader();
const decoder = new TextDecoder();

import { applyCssMapPerFile } from "./css-map";
import { sendReloadDocument } from "./devtools-ws";

while (true) {
	const { done, value } = await reader.read();
	{
		const lines = decoder.decode(value).split("\n");
		for await (const line of lines) {
			const cleanLine = line.replace(/[^ -~]+/g, "");
			const match = cleanLine.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\] .* to (.*)\./);
			if (!match) continue;
			const relfilepath = match[1];
			await applyCssMapPerFile(relfilepath);
			sendReloadDocument();
		}
	}
	if (done) break;
}
