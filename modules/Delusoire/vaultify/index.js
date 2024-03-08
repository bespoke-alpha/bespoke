import { createSettings } from "/modules/Delusoire/std/api/settings.js";
export let settings;
export default async function (mod) {
    [settings] = createSettings(mod);
    await import("./settings.js");
}
