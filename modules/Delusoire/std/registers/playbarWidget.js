import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../api/createIconComponent.js";
import { registerTransform } from "../mixin.js";
const registry = new Registry();
export default registry;
globalThis.__renderNowPlayingWidgets = registry.getItems.bind(registry);
registerTransform({
    transform: emit => str => {
        str = str.replace(/(hideButtonFactory[^\]]*)/, "$1,...__renderNowPlayingWidgets()");
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
export const NowPlayingWidget = ({ label, icon, onClick }) => (S.React.createElement(S.ReactComponents.Tooltip, { label: label },
    S.React.createElement(S.ReactComponents.ButtonTertiary, { size: "small", className: undefined, "aria-label": label, condensed: false, iconOnly: icon && (() => createIconComponent({ icon })), onClick: onClick })));
