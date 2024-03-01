import { createFolder } from "/modules/Delusoire/delulib/platformApi.js";
import { settings } from "./index.js";
import { loadRatings } from "./util.js";
const RATINGS_FOLDER_NAME = "®️ Ratings";
export const CONFIG = settings
    .addInput({ id: "heartThreshold", desc: "Threshold for liking trakcs", inputType: "number" }, () => "3")
    .addInput({ id: "skipThreshold", desc: "Threshold for skipping trakcs", inputType: "number" }, () => "1")
    .addInput({
    id: "ratingsFolderUri",
    desc: "Ratings folder uri",
    inputType: "text",
    onChange: loadRatings,
}, async () => (await createFolder(RATINGS_FOLDER_NAME)).uri)
    .finalize().cfg;
