import { searchYoutube, spotifyApi } from "/modules/delulib/api.js";
import { normalizeStr } from "/modules/delulib/util.js";
import { CONFIG } from "./settings.js";
import { S, createRegistrar } from "/modules/std/index.js";
import { useMenuItem } from "/modules/std/registers/menu.js";
import { createIconComponent } from "/modules/std/api/createIconComponent.js";
// import { Innertube, UniversalCache } from "https://esm.sh/youtubei.js/web.bundle.min";
// const yt = await Innertube.create({
// 	cache: new UniversalCache(false),
// 	fetch: (url, init) => {
// 		return fetch(url, init);
// 	},
// });
const { URI } = S;
const YTVidIDCache = new Map();
const showOnYouTube = async (uri) => {
    const id = URI.fromString(uri).id;
    if (!YTVidIDCache.get(id)) {
        const track = await spotifyApi.tracks.get(id);
        const artists = track.artists.map(artist => artist.name);
        const nonFeatArtists = artists.filter(artist => !track.name.includes(artist));
        const searchString = `${nonFeatArtists.join(", ")} - ${track.name} [Official Music Video]`;
        try {
            const videos = await searchYoutube(CONFIG.YouTubeApiKey, searchString).then(res => res.items);
            const normalizedTrackName = normalizeStr(track.name);
            const video = videos.find(video => {
                normalizeStr(video.snippet.title).includes(normalizedTrackName);
            }) ?? videos[0];
            const ss = await yt.search(searchString, { type: "video", sort_by: "relevance" });
            ss.videos[0].as;
            YTVidIDCache.set(id, video.id.videoId);
            window.open(`https://www.youtube.com/watch?v=${video.id.videoId}`);
        }
        catch (_) {
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchString)}`);
        }
    }
};
export default function (mod) {
    const registrar = createRegistrar(mod);
    registrar.register("menu", S.React.createElement(() => {
        const { props } = useMenuItem();
        const uri = props.uri;
        return (S.React.createElement(S.ReactComponents.MenuItem, { disabled: false, onClick: () => {
                showOnYouTube(uri);
            }, leadingIcon: createIconComponent({
                icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="19px" height="19px"><path fill="currentColor" d="M43.2,33.9c-0.4,2.1-2.1,3.7-4.2,4c-3.3,0.5-8.8,1.1-15,1.1c-6.1,0-11.6-0.6-15-1.1c-2.1-0.3-3.8-1.9-4.2-4C4.4,31.6,4,28.2,4,24c0-4.2,0.4-7.6,0.8-9.9c0.4-2.1,2.1-3.7,4.2-4C12.3,9.6,17.8,9,24,9c6.2,0,11.6,0.6,15,1.1c2.1,0.3,3.8,1.9,4.2,4c0.4,2.3,0.9,5.7,0.9,9.9C44,28.2,43.6,31.6,43.2,33.9z"/><path fill="var(--spice-main)" d="M20 31L20 17 32 24z"/></svg>`,
            }) }, "Show on youtube"));
    }), ({ props }) => {
        return URI.is.Track(props?.uri);
    });
}
