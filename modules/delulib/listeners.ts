import { _ } from "/modules/std/deps.js";
import { S } from "/modules/std/index.js";

import { PermanentMutationObserver, REACT_FIBER } from "./util.js";

const { URI } = S;
const History = S.Platform.getHistory();

export const getTrackLists = () => Array.from(document.querySelectorAll<HTMLDivElement>(".main-trackList-trackList.main-trackList-indexable"));
export const getTrackListTracks = (trackList: HTMLDivElement) =>
	Array.from(trackList.querySelectorAll<HTMLDivElement>(".main-trackList-trackListRow"));

export const onHistoryChanged = (
	toMatchTo: string | RegExp | ((location: string) => boolean),
	callback: (uri?: string) => void,
	dropDuplicates = true,
) => {
	const createMatchFn = (toMatchTo: string | RegExp | ((input: string) => boolean)) => {
		switch (typeof toMatchTo) {
			case "string":
				return (input: string) => input?.startsWith(toMatchTo) ?? false;

			case "function":
				return toMatchTo;

			default:
				return (input: string) => toMatchTo.test(input);
		}
	};

	let lastPathname = "";
	const matchFn = createMatchFn(toMatchTo);

	const historyChanged = ({ pathname }: any) => {
		if (matchFn(pathname)) {
			if (dropDuplicates && lastPathname === pathname) {
			} else callback(URI.from(pathname)?.toURI());
		}
		lastPathname = pathname;
	};

	historyChanged(History.location ?? {});
	return History.listen(historyChanged);
};

const PRESENTATION_KEY = Symbol("presentation");

type TrackListElement = HTMLDivElement & {
	[PRESENTATION_KEY]?: HTMLDivElement;
};
type TrackElement = HTMLDivElement & { props?: Record<string, any> };

type TrackListMutationListener = (tracklist: Required<TrackListElement>, tracks: Array<Required<TrackElement>>) => void;
export const onTrackListMutationListeners = new Array<TrackListMutationListener>();

const _onTrackListMutation = (trackList: Required<TrackListElement>, record: MutationRecord[], observer: MutationObserver) => {
	const tracks = getTrackListTracks(trackList[PRESENTATION_KEY]) as Array<Required<TrackElement>>;

	const recUp = fiber => {
		const parent = fiber.return;
		if (parent.pendingProps.role === "presentation") return fiber;
		return recUp(parent);
	};

	for (const track of tracks) {
		track.props ??= recUp(track[REACT_FIBER]).pendingProps;
	}

	const fullyRenderedTracks = tracks.filter(track => track.props?.uri);

	onTrackListMutationListeners.map(listener => listener(trackList, fullyRenderedTracks));
};

new PermanentMutationObserver("main", () => {
	const trackLists = getTrackLists() as Array<TrackListElement>;
	for (const trackList of trackLists.filter(trackList => !trackList[PRESENTATION_KEY])) {
		trackList[PRESENTATION_KEY] = trackList.lastElementChild!.firstElementChild!.nextElementSibling! as HTMLDivElement;

		new MutationObserver((record, observer) => _onTrackListMutation(trackList as Required<TrackListElement>, record, observer)).observe(
			trackList[PRESENTATION_KEY],
			{ childList: true },
		);
	}
});
