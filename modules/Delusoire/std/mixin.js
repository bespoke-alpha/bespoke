export let registerTransform;
export default function (rt) {
    registerTransform = rt;
    (async () => {
        await import("./expose/index.js");
        await import("./registers/registers.js");
    })();
}
