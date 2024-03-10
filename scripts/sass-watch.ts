const dir = Bun.argv[2] ?? ".";
const { stdout } = Bun.spawn(["sass.cmd", "--no-source-map", "--no-color", "--no-unicode", "--watch", dir]);

import { applyCssMapPerFile } from "./class-map";
import { sendReloadDocument } from "./devtools-ws";
import { readByLine } from "./readByLine";

readByLine(stdout, async line => {
	const match = line.match(/^\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\] .* to (?<file>.*)\./);
	if (!match) return;
	const relfilepath = match.groups.file;
	await applyCssMapPerFile(relfilepath);
	sendReloadDocument();
});
