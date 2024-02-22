import { createFolder } from "../delulib/platformApi.js";
import { SettingsSection } from "../std/api/settings.js";
import { loadRatings } from "./util.js";
const RATINGS_FOLDER_NAME = "®️ Ratings";
const settings = new SettingsSection("Star Ratings")
    .addInput({ id: "heartThreshold", desc: "Threshold for liking trakcs", inputType: "number" }, () => "3")
    .addInput({ id: "skipThreshold", desc: "Threshold for skipping trakcs", inputType: "number" }, () => "1")
    .addInput({
    id: "ratingsFolderUri",
    desc: "Ratings folder uri",
    inputType: "text",
    onChange: loadRatings,
}, async () => (await createFolder(RATINGS_FOLDER_NAME)).uri);
settings.pushSettings();
export const CONFIG = settings.toObject();
