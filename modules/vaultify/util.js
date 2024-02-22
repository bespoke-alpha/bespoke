import { S } from "../std/index.js";
const { URI } = S;
export const isContentOfPersonalPlaylist = (subleaf) => typeof subleaf[0] === "string" && URI.is.Track(subleaf[0]);
