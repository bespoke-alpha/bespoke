import { _ } from "/modules/Delusoirestd/deps.js";

import { listeningToSneakBinds } from "./sneak.js";

import { S } from "/modules/Delusoirestd/index.js";

const History = S.Platform.getHistory();

const SCROLL_STEP = 25;

const getApp = () => document.querySelector<HTMLDivElement>(".Root__main-view div.os-viewport");

export const appScroll = (s: number) => {
	const app = getApp();
	if (!app) return;
	const scrollIntervalId = setInterval(() => {
		app.scrollTop += s * SCROLL_STEP;
	}, 10);
	document.addEventListener("keyup", () => clearInterval(scrollIntervalId));
};

export const appScrollY = (y: number) => getApp()?.scroll(0, y);

export const openPage = (page: string) => History.push({ pathname: page });

export const rotateSidebar = (offset: number) => {
	if (offset === 0) return;

	const navLinks = Array.from(Array.from(document.querySelectorAll<HTMLElement>(".main-yourLibraryX-navLink")).values());

	if (navLinks.length === 0) return;

	const activeNavLink = document.querySelector<HTMLElement>(".main-yourLibraryX-navLinkActive");
	let activeNavLinkIndex = navLinks.findIndex(e => e === activeNavLink);
	if (activeNavLinkIndex === -1 && offset < 0) activeNavLinkIndex = navLinks.length;
	let target = activeNavLinkIndex + (offset % navLinks.length);
	if (target < 0) target += navLinks.length;
	navLinks[target].click();
};

export const resizeLeftSidebar = (pxs: number) => {
	const html = document.firstElementChild as HTMLHtmlElement;
	const htmlStyle = html.style;
	htmlStyle.cssText = htmlStyle.cssText.replace(/(--left-sidebar-width: )[^;]+/, `$1${pxs}px`);
};

export class Bind {
	constructor(
		private key: string,
		private callback: (event: KeyboardEvent) => void,
	) {}

	register() {
		S.Mousetrap.bind(this.key, e => void (!listeningToSneakBinds && this.callback(e)));
	}
}

export const isElementVisible = (e: HTMLElement) => e.checkVisibility({ checkOpacity: true, checkVisibilityCSS: true });
export const isElementInViewPort = (e: HTMLElement) => {
	const c = document.body;
	const bound = e.getBoundingClientRect();
	const within = (m: number, M: number) => (x: number) => m <= x && x <= M;
	const f = (top: number) => _.flow(_.mean, within(0, top));
	return f(c.clientHeight)([bound.top, bound.bottom]) && f(c.clientWidth)([bound.left, bound.right]);
};

export const CLICKABLE_ELEMENT_SELECTOR = `.Root__top-container [href]:not(link),.Root__top-container button,.Root__top-container [role="button"]`;
