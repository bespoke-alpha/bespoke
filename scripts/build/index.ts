import type { Metadata } from "/hooks/module";
import createWatchPlugin from "./watchPlugin";
import createStylesPlugin from "./stylesPlugin";

async function getEntrypoints(args: string[]) {
	const { modules } = await import("/modules/vault.json");
	const isIdentifier = (arg: string): arg is keyof typeof modules => arg in modules;
	const moduleObjs = args.length > 0 ? args.filter(isIdentifier).map(identifier => modules[identifier]) : Object.values(modules);
	const metadataPaths = moduleObjs.map(moduleObj => moduleObj.metadata);
	const metadatas = await Promise.all(metadataPaths.map(metadataPath => import(metadataPath) as Promise<Metadata>));
	const entries = metadatas.flatMap(metadata => Object.values(metadata.entries)).filter(Boolean) as string[];
	return entries;
}

Bun.build({
	entrypoints: await getEntrypoints(Bun.argv.slice(2)),
	outdir: ".",
	target: "browser",
	format: "esm",
	splitting: true,
	plugins: [createWatchPlugin({ path: "/modules" }), createStylesPlugin({})],
	sourcemap: "external",
	minify: {
		whitespace: true,
		identifiers: false,
		syntax: true,
	},
	external: ["http://*", "https://*"],
	naming: "[dir]/[name].[ext]",
	root: ".",
	define: {
		__DEV__: "true",
	},
});
