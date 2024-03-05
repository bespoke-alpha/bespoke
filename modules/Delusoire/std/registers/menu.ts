import { Registry } from "./registry.js";
import { S } from "../expose/expose.js";
import { internalRegisterTransform } from "../../../../hooks/transforms/index.js";
import { matchLast } from "/hooks/util.js";

import type { Context } from "react";

type __MenuContext = Context<MenuContext>;

declare global {
	// biome-ignore lint/style/noVar: global scope
	var __MenuContext: __MenuContext;
}

type MenuContext = {
	props: any;
	trigger: string;
	target: HTMLElement;
};

const registry = new Registry<React.ReactElement, MenuContext>();
export default registry;

export const useMenuItem = () => S.React.useContext(globalThis.__MenuContext);

globalThis.__renderMenuItems = () => {
	const context = useMenuItem();
	return registry.getItems(context);
};
internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/("Menu".+?children:)([\w_\$][\w_\$\d]*)/, "$1[__renderMenuItems(),$2].flat()");

		const croppedInput = str.match(/.*value:"contextmenu"/)![0];
		const react = matchLast(croppedInput, /([\w_\$][\w_\$\d]*)\.useRef/g)[1];
		const menu = matchLast(croppedInput, /menu:([\w_\$][\w_\$\d]*)/g)[1];
		const trigger = matchLast(croppedInput, /trigger:([\w_\$][\w_\$\d]*)/g)[1];
		const target = matchLast(croppedInput, /triggerRef:([\w_\$][\w_\$\d]*)/g)[1];

		str = str.replace(
			/(\(0,([\w_\$][\w_\$\d]*)\.jsx\)\([\w_\$][\w_\$\d]*\.[\w_\$][\w_\$\d]*,\{value:"contextmenu"[^\}]*\}\)\}\))/,
			`$2.jsx((globalThis.__MenuContext||(globalThis.__MenuContext=${react}.createContext(null))).Provider,{value:{props:${menu}?.props,trigger:${trigger},target:${target}},children:$1})`,
		);

		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

export const createProfileMenuShouldAdd =
	() =>
	({ trigger, target }: MenuContext) =>
		trigger === "click" && target.parentElement?.classList.contains("main-topBar-topbarContentRight");
