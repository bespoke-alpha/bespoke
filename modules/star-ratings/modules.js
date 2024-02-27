import { findBy } from "/hooks/util.js";
import { S } from "/modules/std/index.js";
const { webpack } = S;
export const CheckedPlaylistButtonIcon = findBy("M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm11.748-1.97a.75.75 0 0 0-1.06-1.06l-4.47 4.47-1.405-1.406a.75.75 0 1 0-1.061 1.06l2.466 2.467 5.53-5.53z")(webpack.exportedFunctions);
export const curationButtonClass = webpack.exports.find(m => m?.curationButton).curationButton;
