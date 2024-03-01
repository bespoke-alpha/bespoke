import { settings } from ".";
import { Settings } from "/modules/Delusoire/std/api/settings.js";

export const CONFIG = settings
	.addInput(
		{
			id: "LFMApiKey",
			desc: "Last.fm API Key",
			inputType: "text",
		},
		() => "********************************",
	)
	.finalize().cfg;
