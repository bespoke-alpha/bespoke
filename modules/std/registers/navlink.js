import { Registry } from "./registry.js";
import { S } from "../expose/expose.js";
import { internalRegisterTransform } from "/hooks/transforms/transforms.js";
import { findMatchingPos } from "/hooks/util.js";
const registry = new Registry();
export default registry;
globalThis.__renderNavLinks = registry.getItems.bind(registry);
internalRegisterTransform({
    transform: emit => str => {
        const j = str.search(/\("li",\{[^\{]*\{[^\{]*\{to:"\/search/);
        const i = findMatchingPos(str, j, 1, ["(", ")"], 1);
        emit();
        return `${str.slice(0, i)},...__renderNavLinks()${str.slice(i)}`;
    },
    glob: /^\/xpui\.js/,
});
export const NavLink = ({ localizedApp, appRoutePath, icon, activeIcon }) => {
    const I_O = S.React.useMemo(() => S.webpack.exportedMemos.find(m => m.type.$$typeof === Symbol.for("react.forward_ref") && m.type.render.toString().includes("navigationalRoot")), []);
    const isSidebarCollapsed = S.Platform.getLocalStorageAPI().getItem("ylx-sidebar-state") === 1;
    return (S.React.createElement("li", { className: "LU0q0itTx2613uiATSig InvalidDropTarget" },
        S.React.createElement(S.ReactComponents.Tooltip, { label: isSidebarCollapsed ? localizedApp : null, disabled: !isSidebarCollapsed, placement: "right" },
            S.React.createElement(I_O, { to: appRoutePath, referrer: appRoutePath.slice(1), className: S.classnames("link-subtle", "UYeKN11KAw61rZoyjcgZ", {
                    "DzWw3g4E_66wu9ktqn36": S.Platform.getHistory().pathanme.startsWith(appRoutePath),
                }), onClick: () => undefined, "aria-label": localizedApp },
                S.React.createElement(S.ReactComponents.IconComponent, { autoMirror: false, className: "icon", viewBox: "0 0 24 24", dangerouslySetInnerHTML: { __html: icon } }),
                S.React.createElement(S.ReactComponents.IconComponent, { autoMirror: false, className: "active-icon", viewBox: "0 0 24 24", dangerouslySetInnerHTML: { __html: activeIcon } }),
                !isSidebarCollapsed && S.React.createElement(S.ReactComponents.Text, { variant: "bodyMediumBold" }, localizedApp)))));
};
