import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../api/createIconComponent.js";
import { registerTransform } from "../mixin.js";
const registry = new Registry();
export default registry;
globalThis.__renderPlaybarBarControls = registry.getItems.bind(registry, undefined, true);
registerTransform({
    transform: emit => str => {
        str = str.replace(/(children:\[)([^\[]*djJumpButtonFactory)/, "$1...__renderPlaybarBarControls(),$2");
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
export const PlaybarBarControl = ({ label, isActive = false, isActiveNoIndicator = false, disabled = false, icon, onClick, }) => {
    const [_isActive, _setIsActive] = S.React.useState(isActive);
    return (S.React.createElement(S.ReactComponents.Tooltip, { label: label },
        S.React.createElement(S.ReactComponents.ButtonTertiary, { "aria-label": label, size: "small", className: `main-genericButton-button ${_isActive || isActiveNoIndicator ? "main-genericButton-buttonActive" : ""} ${_isActive ? "main-genericButton-buttonActiveDot" : ""}`, disabled: disabled, iconOnly: icon && (() => createIconComponent({ icon })), onClick: () => {
                onClick();
                _setIsActive(!_isActive);
            }, "data-active": _isActive.toString(), "aria-pressed": _isActive })));
};
