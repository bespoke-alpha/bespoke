export declare const appScroll: (s: number) => void;
export declare const appScrollY: (y: number) => void;
export declare const openPage: (page: string) => any;
export declare const rotateSidebar: (offset: number) => void;
export declare const resizeLeftSidebar: (pxs: number) => void;
export declare class Bind {
    private key;
    private callback;
    constructor(key: string, callback: (event: KeyboardEvent) => void);
    register(): void;
}
export declare const isElementVisible: (e: HTMLElement) => boolean;
export declare const isElementInViewPort: (e: HTMLElement) => any;
export declare const CLICKABLE_ELEMENT_SELECTOR = ".ZQftYELq0aOsg6tPbVbV [href]:not(link),.ZQftYELq0aOsg6tPbVbV button,.ZQftYELq0aOsg6tPbVbV [role=\"button\"]";
