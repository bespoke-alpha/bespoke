import { SettingsSection } from "/modules/Delusoire/std/api/settings.js";

const settings = new SettingsSection("Show The Genres")
	.addInput(
		{
			id: "LFMApiKey",
			desc: "Last.FM API Key",
			inputType: "text",
		},
		() => "********************************",
	)
	.addInput({ id: "LFMUsername", desc: "Last.FM username", inputType: "text" }, () => "Username");

settings.pushSettings();

export const CONFIG = settings.toObject();
