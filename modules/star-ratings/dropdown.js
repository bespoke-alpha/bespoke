import { CheckedPlaylistButtonIcon, curationButtonClass } from "./modules.js";
import { toggleRating } from "./ratings.js";
import { _ } from "/modules/std/deps.js";
import { S } from "/modules/std/index.js";
const { ButtonTertiary } = S.ReactComponents;
const RatingButton = ({ i, uri }) =>
	S.React.createElement(ButtonTertiary, {
		size: "small",
		className: `${curationButtonClass} rating-${i}`,
		"aria-checked": "true",
		"aria-label": "",
		condensed: "true",
		iconOnly: CheckedPlaylistButtonIcon,
		semanticColor: "textBrightAccent",
		// ref=
		onClick: () => toggleRating(uri, i),
	});
export const Dropdown = ({ uri }) =>
	S.React.createElement(
		"div",
		{ className: "rating-dropdown" },
		_.range(1, 6).map(i => S.React.createElement(RatingButton, { i: i, uri: uri })),
	);
