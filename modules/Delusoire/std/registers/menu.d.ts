import { Registry } from "./registry.js";
import type { Context } from "react";
type __MenuContext = Context<MenuContext>;
declare global {
    var __MenuContext: __MenuContext;
}
type MenuContext = {
    props: any;
    trigger: string;
    target: HTMLElement;
};
declare const registry: Registry<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, MenuContext>;
export default registry;
export declare const useMenuItem: () => MenuContext;
export declare const createProfileMenuShouldAdd: () => ({ trigger, target }: MenuContext) => boolean;
