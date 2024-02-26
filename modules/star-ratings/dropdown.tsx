import { CheckedPlaylistButtonIcon, curationButtonClass } from "./modules.js";

import { toggleRating } from "./ratings.js";
import { _ } from "../std/deps.js";

import { S } from "../std/index.js";

const { ButtonTertiary } = S.ReactComponents;

const RatingButton = ({ i, uri }: { i: number; uri: string }) => (
	<ButtonTertiary
		size="small"
		className={`${curationButtonClass} rating-${i}`}
		aria-checked="true"
		aria-label=""
		condensed="true"
		iconOnly={CheckedPlaylistButtonIcon}
		semanticColor="textBrightAccent"
		// ref=
		onClick={() => toggleRating(uri, i)}
	/>
);

export const Dropdown = ({ uri }: { uri: string }) => (
	<div className="rating-dropdown">
		{_.range(1, 6).map(i => (
			<RatingButton i={i} uri={uri} />
		))}
	</div>
);
