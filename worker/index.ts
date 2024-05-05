import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const xSetHeaders = "X-Set-Headers";

export default new Elysia({ aot: false })
	.onAfterHandle(({ set }) => {
		set.headers["Access-Control-Allow-Credentials"] = "true";
	})
	.use(
		cors({
			allowedHeaders: [xSetHeaders, "Access-Control-Allow-Credentials"],
			origin: "xpui.app.spotify.com",
		}),
	)
	.get("/", () => new Response(undefined, { status: 418 }))
	.get("/ping/", () => new Response("pong", { status: 200 })) // TODO: can be used to track launches
	.get("/protocol/*", async context => {
		const strippedPath = context.path.slice("/protocol/".length);
		const html = `
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>bespoke protocol</title>
</head>
<body>
	<script>open("${strippedPath}")</script>
</body>
</html>
`;
		return new Blob([html], { type: "text/html" });
	});
// .listen(8787);
