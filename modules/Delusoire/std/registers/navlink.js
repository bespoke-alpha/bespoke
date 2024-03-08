import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { findMatchingPos } from "/hooks/util.js";
import { createIconComponent } from "../api/createIconComponent.js";
import { registerTransform } from "../mixin.js";
const registry = new Registry();
export default registry;
globalThis.__renderNavLinks = () => registry.getItems().map(Item => S.React.createElement(Item, null));
registerTransform({
    transform: emit => str => {
        const j = str.search(/\("li",\{[^\{]*\{[^\{]*\{to:"\/search/);
        const i = findMatchingPos(str, j, 1, ["(", ")"], 1);
        emit();
        return `${str.slice(0, i)},...__renderNavLinks()${str.slice(i)}`;
    },
    glob: /^\/xpui\.js/,
});
export const NavLink = ({ localizedApp, appRoutePath, icon, activeIcon }) => {
    const isSidebarCollapsed = S.Platform.getLocalStorageAPI().getItem("ylx-sidebar-state") === 1;
    const isActive = S.Platform.getHistory().location.pathanme?.startsWith(appRoutePath);
    return (S.React.createElement("li", { className: "main-yourLibraryX-navItem InvalidDropTarget" },
        S.React.createElement(S.ReactComponents.Tooltip, { label: isSidebarCollapsed ? localizedApp : null, disabled: !isSidebarCollapsed, placement: "right" },
            S.React.createElement(S.ReactComponents.Nav, { to: appRoutePath, referrer: "other", className: S.classnames("link-subtle", "main-yourLibraryX-navLink", {
                    "main-yourLibraryX-navLinkActive": isActive,
                }), onClick: () => undefined, "aria-label": localizedApp },
                createIconComponent({ icon: isActive ? activeIcon : icon, iconSize: 24 }),
                !isSidebarCollapsed && S.React.createElement(S.ReactComponents.Text, { variant: "bodyMediumBold" }, localizedApp)))));
};
