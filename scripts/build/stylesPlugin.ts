import type { BunPlugin } from "bun";

interface StylesPluginOpts {
	_?: undefined;
}

export default function ({ _ }: StylesPluginOpts) {
	return {
		name: "Styles Plugin",
		async setup(build) {
			const sass = await import("sass");
			const postcss = await import("postcss");

			const PostCSSProcessor = await postcss.default([]);

			build.onLoad({ filter: /\.scss$/ }, args => {
				const { css: compiledCss } = sass.compile(args.path);
				const { css: processedCss } = PostCSSProcessor.process(compiledCss, { from: args.path });
				const css = String.raw`${processedCss}`.trim();

				return {
					contents: css,
					loader: "file",
				};
			});
		},
	} as BunPlugin;
}
