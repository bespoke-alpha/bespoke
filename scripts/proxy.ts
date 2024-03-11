import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

new Elysia()
	.use(cors())
	.get("/", async context => {
		const xSetUrl = "X-Set-Url";
		const xSetHeaders = "X-Set-Headers";

		// return new Response(undefined, { status: 418 })
		try {
			const req = context.request;
			const url = req.headers.get(xSetUrl)!;
			const headers = JSON.parse(req.headers.get(xSetHeaders));
			req.headers.delete(xSetUrl);
			req.headers.delete(xSetHeaders);

			req.headers.delete("host");
			for (const [k, v] of Object.entries(headers ?? {})) {
				if (v === null) {
					req.headers.delete(k);
				} else {
					req.headers.set(k, v);
				}
			}

			const res = await fetch(url, req);

			for (const k of ["Access-Control-Allow-Origin", "Content-Encoding", "Date"]) {
				res.headers.delete(k);
			}

			return res;
		} catch (e) {
			console.error(e);
			throw e;
		}
	})
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
