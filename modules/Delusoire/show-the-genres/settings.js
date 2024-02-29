import { Settings } from "/modules/Delusoire/std/api/settings.js";
const settings = new Settings("Show The Genres").addInput({
    id: "LFMApiKey",
    desc: "Last.fm API Key",
    inputType: "text",
}, () => "********************************");
settings.pushSettings();
export const CONFIG = settings.toObject();
