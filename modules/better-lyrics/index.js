import { render } from "https://esm.sh/lit";
import { PermanentMutationObserver } from "/modules/delulib/util.js";
import { PlayerW } from "./utils/PlayerW.js";
import { LyricsWrapper } from "./components/components.js";
const injectLyrics = (insertSelector, scrollSelector) => () => {
    const lyricsContainer = document.querySelector(insertSelector);
    if (!lyricsContainer || lyricsContainer.classList.contains("injected"))
        return;
    lyricsContainer.classList.add("injected");
    const lyricsContainerClone = lyricsContainer.cloneNode(false);
    lyricsContainer.replaceWith(lyricsContainerClone);
    const ourLyricsContainer = new LyricsWrapper(scrollSelector);
    ourLyricsContainer.song = PlayerW.getSong() ?? null;
    PlayerW.songSubject.subscribe(song => ourLyricsContainer.updateSong(song ?? null));
    PlayerW.progressPercentSubject.subscribe(progress => ourLyricsContainer.updateProgress(progress));
    render(ourLyricsContainer, lyricsContainerClone);
};
const injectNPVLyrics = injectLyrics("aside .hzUuLPdH48AzgQun5NYQ", "aside .hzUuLPdH48AzgQun5NYQ");
const injectCinemaLyrics = injectLyrics("#lyrics-cinema .esRByMgBY3TiENAsbDHA", "#lyrics-cinema .os-viewport-native-scrollbars-invisible");
injectNPVLyrics();
injectCinemaLyrics();
new PermanentMutationObserver(".OTfMDdomT5S7B5dbYTT8", injectNPVLyrics);
new PermanentMutationObserver(".Root__lyrics-cinema", injectCinemaLyrics);
