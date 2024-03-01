import { createRegistrar, createSettings } from "/modules/Delusoire/std/index.js";
import type { Module } from "/hooks/module.js";
import { S } from "/modules/Delusoire/std/index.js";
import type { Settings } from "/modules/Delusoire/std/api/settings.js";

const { URI } = S;

export let settings: Settings;
export default async function (mod: Module) {
	const registrar = createRegistrar(mod);
	settings = createSettings(mod);

	const { FolderPickerMenuItem } = await import("./starRatings.js");

	registrar.register("menu", <FolderPickerMenuItem />, ({ props }) => {
		return URI.is.Folder(props?.reference?.uri);
	});
}
