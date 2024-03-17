import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const xSetUrl = "X-Set-Url";
const xSetHeaders = "X-Set-Headers";

new Elysia()
	.use(
		cors({
			allowedHeaders: [xSetUrl, xSetHeaders],
		}),
	)
	.all("/", async context => {
		// return new Response(undefined, { status: 418 })
		try {
			const req = context.request;
			const url = req.headers.get(xSetUrl)!;
			const headers = JSON.parse(req.headers.get(xSetHeaders));
			req.headers.delete(xSetUrl);
			req.headers.delete(xSetHeaders);

			req.headers.delete("host");
			for (const [k, v] of Object.entries(headers ?? {})) {
				if (v === "undefined") {
					req.headers.delete(k);
				} else {
					req.headers.set(k, v);
				}
			}

			const res = await fetch(url, new Request(req, { body: context.body }));

			for (const k of [
				"Access-Control-Allow-Origin",
				"Access-Control-Allow-Methods",
				"Access-Control-Allow-Headers",
				"Access-Control-Expose-Headers",
				"Access-Control-Allow-Credentials",
				"Access-Control-Max-Age",
				"Content-Encoding",
				"Date",
			]) {
				res.headers.delete(k);
			}

			return res;
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
	})
	.listen(3000);
