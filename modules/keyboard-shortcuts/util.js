import { _ } from "/hooks/deps.js";
import { listeningToSneakBinds } from "./sneak.js";
import { S } from "../std/index.js";
const History = S.Platform.getHistory();
const SCROLL_STEP = 25;
const getApp = () => document.querySelector(".jEMA2gVoLgPQqAFrPhFw div.os-viewport");
export const appScroll = (s) => {
    const app = getApp();
    if (!app)
        return;
    const scrollIntervalId = setInterval(() => {
        app.scrollTop += s * SCROLL_STEP;
    }, 10);
    document.addEventListener("keyup", () => clearInterval(scrollIntervalId));
};
export const appScrollY = (y) => getApp()?.scroll(0, y);
export const openPage = (page) => History.push({ pathname: page });
export const rotateSidebar = (offset) => {
    if (offset === 0)
        return;
    const navLinks = Array.from(Array.from(document.querySelectorAll(".UYeKN11KAw61rZoyjcgZ")).values());
    if (navLinks.length === 0)
        return;
    const activeNavLink = document.querySelector(".UYeKN11KAw61rZoyjcgZActive");
    let activeNavLinkIndex = navLinks.findIndex(e => e === activeNavLink);
    if (activeNavLinkIndex === -1 && offset < 0)
        activeNavLinkIndex = navLinks.length;
    let target = activeNavLinkIndex + (offset % navLinks.length);
    if (target < 0)
        target += navLinks.length;
    navLinks[target].click();
};
export const resizeLeftSidebar = (pxs) => {
    const html = document.firstElementChild;
    const htmlStyle = html.style;
    htmlStyle.cssText = htmlStyle.cssText.replace(/(--left-sidebar-width: )[^;]+/, `$1${pxs}px`);
};
export class Bind {
    constructor(key, callback) {
        this.key = key;
        this.callback = callback;
    }
    register() {
        S.Mousetrap.bind(this.key, e => void (!listeningToSneakBinds && this.callback(e)));
    }
}
export const isElementVisible = (e) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
export const isElementInViewPort = (e) => {
    const c = document.body;
    const bound = e.getBoundingClientRect();
    const within = (m, M) => (x) => m <= x && x <= M;
    const f = (top) => _.flow(_.mean, within(0, top));
    return f(c.clientHeight)([bound.top, bound.bottom]) && f(c.clientWidth)([bound.left, bound.right]);
};
export const CLICKABLE_ELEMENT_SELECTOR = `.ZQftYELq0aOsg6tPbVbV [href]:not(link),.ZQftYELq0aOsg6tPbVbV button,.ZQftYELq0aOsg6tPbVbV [role="button"]`;
