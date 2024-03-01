import { Registry } from "./registry.js";
import { S } from "../expose/expose.js";
import { internalRegisterTransform } from "/hooks/transforms/transforms.js";
import { createIconComponent } from "../api/createIconComponent.js";
import { matchLast } from "/hooks/util.js";
class R extends Registry {
    register(item, predicate) {
        super.register(item, predicate);
        refreshNavButtons.then(refresh => refresh());
        return item;
    }
    unregister(item) {
        super.unregister(item);
        refreshNavButtons.then(f => f());
        return item;
    }
}
const registry = new R();
export default registry;
let resolveRefreshNavButtons = undefined;
const refreshNavButtons = new Promise(r => {
    resolveRefreshNavButtons = r;
});
globalThis.__renderTopbarLeftButtons = registry.getItems.bind(registry);
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/("top-bar-forward-button"[^\]]*)/g, "$1,...__renderTopbarLeftButtons()");
        const croppedInput = str.match(/.*"top-bar-back-button"/)[0];
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
export const Button = ({ label, disabled = false, onClick, icon }) => (S.React.createElement(S.ReactComponents.Tooltip, { label: label },
    S.React.createElement("button", { "aria-label": label, disabled: disabled, className: "ql0zZd7giPXSnPg75NR0", onClick: onClick }, icon && createIconComponent({ icon, className: "IYDlXmBmmUKHveMzIPCF" }))));
