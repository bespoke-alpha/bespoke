const dir = Bun.argv[2] ?? ".";
const { stdout } = Bun.spawn(["tsc.cmd", "--pretty", "false", "--noResolve", "--watch", "--listEmittedFiles", "--project", dir]);

import path from "node:path";

import { applyCssMapPerFile } from "./class-map";
import { sendReloadDocument } from "./devtools-ws";
import { readByLine } from "./readByLine";

readByLine(stdout, async line => {
	const match = line.match(/^TSFILE: (?<file>.*)$/);
	if (!match) return;
	const relfilepath = path.relative(process.cwd(), match.groups.file);
	await applyCssMapPerFile(relfilepath);
	sendReloadDocument();
});
