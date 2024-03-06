import { Predicate, Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../api/createIconComponent.js";
import type { ReactElement, SetStateAction } from "react";
import { matchLast } from "/hooks/util.js";
import { registerTransform } from "../mixin.js";

class R extends Registry<React.ReactElement, void> {
	register(item: ReactElement, predicate: Predicate<void>): ReactElement {
		super.register(item, predicate);
		refreshNavButtons.then(refresh => refresh());
		return item;
	}

	unregister(item: ReactElement): ReactElement {
		super.unregister(item);
		refreshNavButtons.then(f => f());
		return item;
	}
}

const registry = new R();
export default registry;

let resolveRefreshNavButtons = undefined;
const refreshNavButtons = new Promise<() => void>(r => {
	resolveRefreshNavButtons = r;
});

globalThis.__renderTopbarLeftButtons = registry.getItems.bind(registry);
registerTransform<React.Dispatch<SetStateAction<number>>>({
	transform: emit => str => {
		str = str.replace(/("top-bar-forward-button"[^\]]*)/g, "$1,...__renderTopbarLeftButtons()");

		const croppedInput = str.match(/.*"top-bar-back-button"/)![0];
		const react = matchLast(croppedInput, /([\w_\$][\w_\$\d]*)\.useCallback/g)[1];
		str = str.replace(/(hitUiNavigateForwardInHistory.*?)(return)/, `$1const[rand,setRand]=${react}.useState(0);__setNavButtonsRand=setRand;$2`);
		Object.defineProperty(globalThis, "__setNavButtonsRand", {
			set: emit,
		});
		return str;
	},
	then: setNavButtonsRand => {
		resolveRefreshNavButtons(() => setNavButtonsRand(Math.random()));
	},
	glob: /^\/xpui\.js/,
});

type ButtonProps = { label: string; disabled?: boolean; onClick: () => void; icon?: string };
export const Button = ({ label, disabled = false, onClick, icon }: ButtonProps) => (
	<S.ReactComponents.Tooltip label={label}>
		<button aria-label={label} disabled={disabled} className="main-topBar-button" onClick={onClick}>
			{icon && createIconComponent({ icon, className: "main-topBar-icon" })}
		</button>
	</S.ReactComponents.Tooltip>
);
