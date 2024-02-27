import { S } from "/modules/std/index.js";
import { PermanentMutationObserver, REACT_FIBER } from "./util.js";
const { URI } = S;
const History = S.Platform.getHistory();
export const getTrackLists = () => Array.from(document.querySelectorAll(".ShMHCGsT93epRGdxJp2w.Ss6hr6HYpN4wjHJ9GHmi"));
export const getTrackListTracks = (trackList) => Array.from(trackList.querySelectorAll(".h4HgbO_Uu1JYg5UGANeQ"));
export const onHistoryChanged = (toMatchTo, callback, dropDuplicates = true) => {
    const createMatchFn = (toMatchTo) => {
        switch (typeof toMatchTo) {
            case "string":
                return (input) => input?.startsWith(toMatchTo) ?? false;
            case "function":
                return toMatchTo;
            default:
                return (input) => toMatchTo.test(input);
        }
    };
    let lastPathname = "";
    const matchFn = createMatchFn(toMatchTo);
    const historyChanged = ({ pathname }) => {
        if (matchFn(pathname)) {
            if (dropDuplicates && lastPathname === pathname) {
            }
            else
                callback(URI.from(pathname)?.toURI());
        }
        lastPathname = pathname;
    };
    historyChanged(History.location ?? {});
    return History.listen(historyChanged);
};
const PRESENTATION_KEY = Symbol("presentation");
export const onTrackListMutationListeners = new Array();
const _onTrackListMutation = (trackList, record, observer) => {
    const tracks = getTrackListTracks(trackList[PRESENTATION_KEY]);
    const recUp = fiber => {
        const parent = fiber.return;
        if (parent.pendingProps.role === "presentation")
            return fiber;
        return recUp(parent);
    };
    for (const track of tracks) {
        track.props ??= recUp(track[REACT_FIBER]).pendingProps;
    }
    const fullyRenderedTracks = tracks.filter(track => track.props?.uri);
    onTrackListMutationListeners.map(listener => listener(trackList, fullyRenderedTracks));
};
new PermanentMutationObserver("main", () => {
    const trackLists = getTrackLists();
    for (const trackList of trackLists.filter(trackList => !trackList[PRESENTATION_KEY])) {
        trackList[PRESENTATION_KEY] = trackList.lastElementChild.firstElementChild.nextElementSibling;
        new MutationObserver((record, observer) => _onTrackListMutation(trackList, record, observer)).observe(trackList[PRESENTATION_KEY], { childList: true });
    }
});
