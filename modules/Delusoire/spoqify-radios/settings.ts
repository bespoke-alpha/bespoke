import { createFolder } from "/modules/Delusoiredelulib/platformApi.js";
import { SettingsSection } from "/modules/Delusoirestd/api/settings.js";

const ANONIMYZED_RADIOS_FOLDER_NAME = "🎭 Anonymized Radios";

const settings = new SettingsSection("Spoqify Radios").addInput(
	{
		id: "anonymizedRadiosFolderUri",
		desc: "Anonymized Radios folder uri",
		inputType: "text",
	},
	async () => (await createFolder(ANONIMYZED_RADIOS_FOLDER_NAME)).uri,
);

settings.pushSettings();

export const CONFIG = settings.toObject();
