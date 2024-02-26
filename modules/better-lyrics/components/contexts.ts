import { createContext } from "https://esm.sh/@lit/context";

import { LyricsType } from "../utils/LyricsProvider.js";

export const scrollTimeoutCtx = createContext<number>("scrollTimeout");
export const scrollContainerCtx = createContext<HTMLElement | undefined>("scrollContainer");
export const loadedLyricsTypeCtx = createContext<LyricsType | undefined>("loadedLyricsType");
