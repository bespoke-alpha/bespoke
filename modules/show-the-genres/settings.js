import { SettingsSection } from "../std/api/settings.js";
const settings = new SettingsSection("Show The Genres").addInput({
    id: "LFMApiKey",
    desc: "Last.fm API Key",
    inputType: "text",
}, () => "********************************");
settings.pushSettings();
export const CONFIG = settings.toObject();
