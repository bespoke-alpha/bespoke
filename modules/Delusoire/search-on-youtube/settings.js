import { settings } from "./index.js";
export const CONFIG = settings
    .addInput({
    id: "YouTubeApiKey",
    desc: "YouTube API Key",
    inputType: "text",
}, () => "***************************************")
    .finalize().cfg;
