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
	.all("/mitm/*", async context => {
		// return new Response(undefined, { status: 418 })
		let resClone: Response;

		const logs = [];
		let err: any;
		try {
			const req = new Request(context.request, { body: context.body });
			const reqUrlObj = new URL(context.request.url);
			const urlPath = context.params["*"];
			const urlSearch = reqUrlObj.search;
			const url = urlPath + urlSearch;
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

			logs.push(new Date());
			logs.push(url);
			logs.push(...Array.from(req.headers.entries()).map(([k, v]) => `${k}: ${v}`));
			const res = await fetch(url, req);
			resClone = new Response(res.body, res);
			logs.push(await resClone.clone().text());

			for (const k of ["Access-Control-Allow-Origin", "Content-Encoding", "Date"]) {
				resClone.headers.delete(k);
			}

			if (resClone.headers.has("Location")) {
				const locationHeader = resClone.headers.get("Location");

				let locationUrlObj: URL;
				try {
					locationUrlObj = new URL(locationHeader);
					locationUrlObj = new URL(`${reqUrlObj.origin}/mitm/${locationUrlObj.href}`);
				} catch (_) {
					locationUrlObj = new URL(reqUrlObj);
					locationUrlObj.search = "";
					if (!locationUrlObj.href.endsWith("/")) {
						locationUrlObj.href += "/";
					}
					locationUrlObj.href += locationHeader;
				}

				resClone.headers.set("Location", locationUrlObj.href);
			}
		} catch (e) {
			err = e;
		}

		console.log("-".repeat(50));
		console.log(logs.join("\n"));
		if (err) {
			console.log("\n");
			console.error(err);
			throw err;
		}
		return resClone;
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
	.listen(8787);
