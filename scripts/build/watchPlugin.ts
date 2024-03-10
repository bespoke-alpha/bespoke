import type { BunPlugin } from "bun";
import { watch } from "node:fs/promises";
import debounce from "lodash/debounce";

interface BuildPluginOpts {
	path: string;
	wait?: number;
}

export default function ({ path, wait = 1000 }: BuildPluginOpts) {
	let init = false;

	return {
		name: "Build Plugin",
		async setup(build) {
			if (init) return;
			init = true;

			async function rebuild() {
				console.log("Rebuilding...");
				await Bun.build(build.config);
			}

			const debouncedRebuild = debounce(rebuild, wait);

			const watcher = watch(path, { recursive: true });
			for await (const event of watcher) {
				console.log(`${event.filename} was ${event.eventType}d`);
				debouncedRebuild();
			}
		},
	} as BunPlugin;
}
