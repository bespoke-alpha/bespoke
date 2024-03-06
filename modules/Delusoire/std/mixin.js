export let registerTransform;
export default async function (rt) {
    registerTransform = rt;
    await import("./expose/index.js");
    await import("./registers/registers.js");
}
