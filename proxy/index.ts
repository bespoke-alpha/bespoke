import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";

const SEP = "-20";
const HOST = ".delusoire.top";
const xSetHeaders = "X-Set-Headers";

function extractReqUrl(req: Request) {
	const reqUrl = new URL(req.url);
	reqUrl.host = reqUrl.host.slice(0, -HOST.length).replaceAll(SEP, ".");
	return reqUrl.toString();
}

function processReqHeaders(req: Request) {
	const headers = JSON.parse(req.headers.get(xSetHeaders)) as Record<string, string>;

	req.headers.delete("host");
	req.headers.delete(xSetHeaders);
	for (const [k, v] of Object.entries(headers ?? {})) {
		if (v === "undefined") {
			req.headers.delete(k);
		} else {
			req.headers.set(k, v);
		}
	}
}

function fixUrl(url: string, reqUrl: string) {
	let urlObj: URL;
	try {
		urlObj = new URL(url);
		urlObj.host = urlObj.host.replaceAll(".", SEP) + HOST;
	} catch (_) {
		urlObj = new URL(reqUrl);
		urlObj.search = "";
		if (!urlObj.href.endsWith("/")) {
			urlObj.href += "/";
		}
		urlObj.href += url;
	}

	return urlObj.href;
}

function processResHeaders(res: Response, reqUrl: string) {
	const blacklistedHeaders = ["Access-Control-Allow-Origin", "Content-Encoding", "Date"];

	for (const k of blacklistedHeaders) {
		res.headers.delete(k);
	}

	if (res.headers.has("Location")) {
		const locationHeader = res.headers.get("Location");
		const fixedLocationHeader = fixUrl(locationHeader, reqUrl);
		res.headers.set("Location", fixedLocationHeader);
	}
}

const handleMitm = async (req: Request, logs: any[]) => {
	const url = extractReqUrl(req);
	processReqHeaders(req);

	logs.push(new Date());
	logs.push(url);
	logs.push(...Array.from(req.headers.entries()).map(([k, v]) => `${k}: ${v}`));

	// Thanks Bun for not accepting Request.redirect = "manual"
	const res = await fetch(new Request(url, req), { redirect: "manual" });
	const resCopy = new Response(res.body, res);

	logs.push(await resCopy.clone().text());

	processResHeaders(resCopy, req.url);
	return resCopy;
};

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
		const logs = [];

		let res: Response, err: any;
		try {
			const reqCopy = new Request(context.request, { body: context.body });
			res = await handleMitm(reqCopy, logs);
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
