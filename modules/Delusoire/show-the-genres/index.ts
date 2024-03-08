import { createSettings } from "/modules/Delusoire/std/api/settings.js";
import type { Module } from "/hooks/module.js";
import type { Settings } from "/modules/Delusoire/std/api/settings.js";

export let settings: Settings;
export default function (mod: Module) {
	[settings] = createSettings(mod);
	import("./showTheGenres.js");
}
