import { SettingsSection } from "/modules/Delusoire/std/api/settings.js";

const settings = new SettingsSection("Search On YouTube").addInput(
	{
		id: "YouTubeApiKey",
		desc: "YouTube API Key",
		inputType: "text",
	},
	() => "***************************************",
);

settings.pushSettings();

export const CONFIG = settings.toObject();
