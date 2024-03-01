import type { Module } from "/hooks/module.js";
import type { Settings } from "/modules/Delusoire/std/api/settings.js";

import { createSettings } from "/modules/Delusoire/std/api/settings.js";

export let settings: Settings;
export default async function (mod: Module) {
	settings = createSettings(mod);

	await import("./settings.js");
}
