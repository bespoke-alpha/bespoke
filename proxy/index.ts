import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const HOST = ".delusoire.top";

const CCC = "-20";

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
		let res: Response;

		const logs = [];
		let err: any;
		try {
			const req = new Request(context.request, { body: context.body });
			res = await handleMitm(req, logs);
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

		return res;
	});
// .listen(7878);

const handleMitm = async (req: Request, logs: any[]) => {
	console.log(req.mode);
	const reqUrlObj = new URL(req.url);
	reqUrlObj.host = reqUrlObj.host.slice(0, -HOST.length).replaceAll(CCC, ".");
	const url = reqUrlObj.toString();
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
	const res = await fetch(new Request(url, req), { redirect: "manual" }); // Thanks Bun for not accepting Request.redirect = "manual"
	const resClone = new Response(res.body, res);
	logs.push(await resClone.clone().text());

	for (const k of ["Access-Control-Allow-Origin", "Content-Encoding", "Date"]) {
		resClone.headers.delete(k);
	}

	if (resClone.headers.has("Location")) {
		const locationHeader = resClone.headers.get("Location");

		let locationUrlObj: URL;
		try {
			locationUrlObj = new URL(locationHeader);
			locationUrlObj.host = locationUrlObj.host.replaceAll(".", CCC) + HOST;
		} catch (_) {
			locationUrlObj = new URL(req.url);
			locationUrlObj.search = "";
			if (!locationUrlObj.href.endsWith("/")) {
				locationUrlObj.href += "/";
			}
			locationUrlObj.href += locationHeader;
		}

		resClone.headers.set("Location", locationUrlObj.href);
	}
	return resClone;
};
