import { S } from "/modules/std/index.js";
const PlayerAPI = S.Platform.getPlayerAPI();
export const SpotifyLoc = {
    before: {
        start: () => ({ before: "start" }),
        fromUri: (uri) => ({ before: { uri } }),
        fromUid: (uid) => ({ before: { uid } }),
    },
    after: {
        end: () => ({ after: "end" }),
        fromUri: (uri) => ({ after: { uri } }),
        fromUid: (uid) => ({ after: { uid } }),
    },
};
export const normalizeStr = (str) => str
    .normalize("NFKD")
    .replace(/\(.*\)/g, "")
    .replace(/\[.*\]/g, "")
    .replace(/-_,/g, " ")
    .replace(/[^a-zA-Z0-9 ]/g, "")
    .replace(/\s+/g, " ")
    .toLowerCase()
    .trim();
export class PermanentMutationObserver extends MutationObserver {
    constructor(targetSelector, callback, opts = {
        childList: true,
        subtree: true,
    }) {
        super(callback);
        this.target = null;
        new MutationObserver(() => {
            const nextTarget = document.querySelector(targetSelector);
            if (nextTarget && !nextTarget.isEqualNode(this.target)) {
                this.target && this.disconnect();
                this.target = nextTarget;
                this.observe(this.target, opts);
            }
        }).observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}
export const waitForElement = (selector, timeout = 5000, location = document.body, notEl) => new Promise((resolve, reject) => {
    const onMutation = () => {
        const el = document.querySelector(selector);
        if (el) {
            if (notEl && el === notEl) {
            }
            else {
                observer.disconnect();
                return resolve(el);
            }
        }
    };
    const observer = new MutationObserver(onMutation);
    onMutation();
    observer.observe(location, {
        childList: true,
        subtree: true,
    });
    if (timeout)
        setTimeout(() => {
            observer.disconnect();
            console.debug();
            reject(`waitForElement: timed out waiting for ${selector}`);
        }, timeout);
});
export const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));
export const mainElement = document.querySelector("main");
export const [REACT_FIBER, REACT_PROPS] = Object.keys(mainElement);
export const createQueueItem = (queued) => ({ uri, uid = "" }) => ({
    contextTrack: {
        uri,
        uid,
        metadata: {
            is_queued: queued.toString(),
        },
    },
    removed: [],
    blocked: [],
    provider: queued ? "queue" : "context",
});
export const setQueue = async (nextTracks, contextUri) => {
    const { _queue, _client } = PlayerAPI._queue;
    const { prevTracks, queueRevision } = _queue;
    const res = await _client.setQueue({
        nextTracks,
        prevTracks,
        queueRevision,
    });
    await PlayerAPI.skipToNext();
    if (contextUri) {
        await new Promise(resolve => {
            PlayerAPI.getEvents().addListener("queue_update", () => resolve(), { once: true });
        });
        await setPlayingContext(contextUri);
    }
    return res;
};
export const setPlayingContext = (uri) => {
    const { sessionId } = PlayerAPI._state;
    return PlayerAPI.updateContext(sessionId, { uri, url: `context://${uri}` });
};
