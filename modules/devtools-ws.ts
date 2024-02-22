import _ from "lodash";

const debuggerTarget = await fetch("http://localhost:9222/json/list")
	.then(res => res.json())
	.then(targets => targets.find(target => target.url === "https://xpui.app.spotify.com/index.html"));

const sep = "-".repeat(50);

console.log();
console.log(sep);
console.log("Attaching to target:", debuggerTarget);
console.log(sep);
console.log();

const ws = new WebSocket(debuggerTarget.webSocketDebuggerUrl);

await new Promise<void>(res => {
	ws.onopen = (ev: Event) => res();
});

function remoteEvalExpr(expression: string) {
	const obj = {
		id: 0,
		method: "Runtime.evaluate",
		params: {
			expression,
		},
	};
	ws.send(JSON.stringify(obj));
}

export const sendReloadDocument = _.debounce(() => {
	remoteEvalExpr("document.location.reload()");
}, 1000);
