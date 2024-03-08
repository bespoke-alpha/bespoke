import { createSettings } from "/modules/Delusoire/std/api/settings.js";
export let settings;
export default function (mod) {
    [settings] = createSettings(mod);
    import("./showTheGenres.js");
}
