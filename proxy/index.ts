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
	.all("*", async context => {
		// return new Response(undefined, { status: 418 })
		try {
			const req = new Request(context.request, { body: context.body });
			const urlObj = new URL(context.request.url);
			const url = urlObj.pathname.slice(1) + urlObj.search;
			const headers = JSON.parse(req.headers.get(xSetHeaders));
			req.headers.delete(xSetHeaders);

			req.headers.delete("host");
			for (const [k, v] of Object.entries(headers ?? {})) {
				if (v === "undefined") {
					req.headers.delete(k);
				} else {
					req.headers.set(k, v);
				}
			}

			const res = await fetch(url, req);
			const resClone = new Response(res.body, res);

			for (const k of ["Access-Control-Allow-Origin", "Content-Encoding", "Date"]) {
				resClone.headers.delete(k);
			}

			return resClone;
		} catch (e) {
			console.error(e);
			throw e;
		}
	})
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
