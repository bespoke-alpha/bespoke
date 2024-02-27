import { _ } from "/modules/std/deps.js";
import { zip_n_uplets } from "/modules/delulib/fp.js";
import { S } from "/modules/std/index.js";
const { Cosmos } = S;
const headers = {
    authority: "apic-desktop.musixmatch.com",
    cookie: "x-mxm-token-guid=",
};
const CONFIG = {
    musixmatchToken: undefined,
};
// if (!CONFIG.musixmatchToken) {
const url = new URL("https://apic-desktop.musixmatch.com/ws/1.1/token.get");
url.searchParams.append("app_id", "web-desktop-app-v1.0");
Cosmos.get(url.toString(), undefined, _.omit(headers, "cookie")).then(res => {
    if (res.message.header.status_code === 200 && res.message.body.user_token) {
        CONFIG.musixmatchToken = res.message.body.user_token;
    }
});
export var LyricsType;
(function (LyricsType) {
    LyricsType[LyricsType["NOT_SYNCED"] = 0] = "NOT_SYNCED";
    LyricsType[LyricsType["LINE_SYNCED"] = 1] = "LINE_SYNCED";
    LyricsType[LyricsType["WORD_SYNCED"] = 2] = "WORD_SYNCED";
})(LyricsType || (LyricsType = {}));
export const Filler = "♪";
export const flattenLyrics = (lyrics) => Array.isArray(lyrics.content) ? lyrics.content.flatMap(flattenLyrics) : [lyrics];
export const findLyrics = async (info) => {
    const { lyrics, subtitles, track } = await fetchMxmMacroSubtitlesGet(info.uri, info.title, info.artist, info.album, info.durationS);
    const l = {};
    if (!lyrics)
        return l;
    const wrapInContainerSyncedType = (__type, content) => ({
        __type,
        tsp: 0,
        tep: 1,
        content,
    });
    if (track.has_richsync) {
        const richSync = await fetchMxmTrackRichSyncGet(track.commontrack_id, track.track_length);
        const wordSynced = richSync.map(rsLine => {
            const tsp = rsLine.ts / track.track_length;
            const tep = rsLine.te / track.track_length;
            const content = rsLine.l.map((word, index, words) => {
                return {
                    tsp: tsp + word.o / track.track_length,
                    tep: tsp + words[index + 1]?.o / track.track_length || tep,
                    content: word.c,
                };
            });
            return { tsp, tep, content };
        });
        const wordSyncedFilled = _(zip_n_uplets(2)([{ tep: 0 }, ...wordSynced, { tsp: 1 }]))
            .map(([prev, next]) => {
            const tsp = prev.tep;
            const tep = next.tsp;
            const duration = (tep - tsp) * track.track_length * 1000;
            return (duration > 500 && {
                tsp,
                tep,
                content: [
                    {
                        tsp,
                        tep,
                        duration,
                        content: Filler,
                    },
                ],
            });
        })
            .zip(wordSynced)
            .flatten()
            .compact()
            .value();
        l.wordSynced = wrapInContainerSyncedType(LyricsType.WORD_SYNCED, wordSyncedFilled);
    }
    if (track.has_subtitles) {
        const subtitle = JSON.parse(subtitles[0].subtitle_body);
        const lineSynced = subtitle.map((sLine, i, subtitle) => {
            const tsp = sLine.time.total / track.track_length;
            const tep = subtitle[i + 1]?.time.total / track.track_length || 1;
            return { tsp, tep, content: [{ tsp, tep, content: sLine.text }] };
        });
        l.lineSynced = wrapInContainerSyncedType(LyricsType.LINE_SYNCED, lineSynced);
    }
    if (track.has_lyrics || track.has_lyrics_crowd) {
        //l.notSynced = wrapInContainerSyncedType(LyricsType.NOT_SYNCED, lyrics.lyrics_body)
    }
    return l;
};
const getTranslation = async (trackId, lang = "en") => {
    const res = await fetchMxmCrowdTrackTranslationsGet(trackId, lang);
    return res.map(translation => ({
        translation: translation.description,
        matchedLine: translation.matched_line,
    }));
};
const fetchMxmMacroSubtitlesGet = async (uri, title, artist, album, durationS, renewsLeft = 1) => {
    const url = new URL("https://apic-desktop.musixmatch.com/ws/1.1/macro.subtitles.get");
    url.searchParams.append("format", "json");
    url.searchParams.append("namespace", "lyrics_richsynched");
    url.searchParams.append("subtitle_format", "mxm");
    url.searchParams.append("app_id", "web-desktop-app-v1.0");
    url.searchParams.append("q_album", album);
    url.searchParams.append("q_artist", artist);
    url.searchParams.append("q_artists", artist);
    url.searchParams.append("q_track", title);
    url.searchParams.append("track_spotify_id", uri);
    url.searchParams.append("q_duration", encodeURIComponent(durationS));
    url.searchParams.append("f_subtitle_length", encodeURIComponent(Math.floor(durationS)));
    url.searchParams.append("usertoken", CONFIG.musixmatchToken);
    const res = await Cosmos.get(url.toString(), undefined, headers);
    if (res.message.header.hint === "renew") {
        return renewsLeft > 0 ? fetchMxmMacroSubtitlesGet(uri, title, artist, album, durationS, 0) : Promise.resolve({});
    }
    const { "track.lyrics.get": trackLyricsGet, "track.snippet.get": trackSnippetGet, "track.subtitles.get": trackSubtitlesGet, "userblob.get": userblobGet, "matcher.track.get": matcherTrackGet, } = res.message.body.macro_calls;
    return {
        lyrics: trackLyricsGet.message.body.lyrics,
        snippet: trackSnippetGet.message.body.snippet,
        subtitles: trackSubtitlesGet.message.body.subtitle_list.map((subtitle_element) => subtitle_element.subtitle),
        track: matcherTrackGet.message.body.track,
    };
};
const fetchMxmTrackRichSyncGet = async (commonTrackId, trackLength) => {
    const url = new URL("https://apic-desktop.musixmatch.com/ws/1.1/track.richsync.get");
    url.searchParams.append("format", "json");
    url.searchParams.append("subtitle_format", "mxm");
    url.searchParams.append("app_id", "web-desktop-app-v1.0");
    url.searchParams.append("f_subtitle_length", encodeURIComponent(trackLength));
    url.searchParams.append("q_duration", encodeURIComponent(trackLength));
    url.searchParams.append("commontrack_id", encodeURIComponent(commonTrackId));
    url.searchParams.append("usertoken", CONFIG.musixmatchToken);
    const res = await Cosmos.get(url.toString(), undefined, headers);
    return JSON.parse(res.message.body.richsync.richsync_body);
};
const fetchMxmCrowdTrackTranslationsGet = async (trackId, lang = "en") => {
    const url = new URL("https://apic-desktop.musixmatch.com/ws/1.1/crowd.track.translations.get");
    url.searchParams.append("translation_fields_set", "minimal");
    url.searchParams.append("selected_language", lang);
    url.searchParams.append("comment_format", "text");
    url.searchParams.append("format", "json");
    url.searchParams.append("app_id", "web-desktop-app-v1.0");
    url.searchParams.append("track_id", trackId);
    url.searchParams.append("usertoken", CONFIG.musixmatchToken);
    const res = await Cosmos.get(url.toString(), undefined, headers);
    return res.message.body.translations_list.map((translation_element) => translation_element.translation);
};
