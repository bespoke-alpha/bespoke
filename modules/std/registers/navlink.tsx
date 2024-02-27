import { Registry } from "./registry.js";
import { S } from "../expose/expose.js";
import { internalRegisterTransform } from "/hooks/transforms/transforms.js";
import { findMatchingPos } from "/hooks/util.js";
import { createIconComponent } from "../api/createIconComponent.js";

const registry = new Registry<React.ReactElement, void>();
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

export type NavLinkProps = { localizedApp: string; appRoutePath: string; icon: string; activeIcon: string };
export const NavLink = ({ localizedApp, appRoutePath, icon, activeIcon }: NavLinkProps) => {
	const I_O = S.React.useMemo(
		() =>
			S.webpack.exportedMemos.find(m => m.type.$$typeof === Symbol.for("react.forward_ref") && m.type.render.toString().includes("navigationalRoot")),
		[],
	);

	const isSidebarCollapsed = S.Platform.getLocalStorageAPI().getItem("ylx-sidebar-state") === 1;

	return (
		<li className="main-yourLibraryX-navItem InvalidDropTarget">
			<S.ReactComponents.Tooltip label={isSidebarCollapsed ? localizedApp : null} disabled={!isSidebarCollapsed} placement="right">
				<I_O
					to={appRoutePath}
					referrer={appRoutePath.slice(1)}
					className={S.classnames("link-subtle", "main-yourLibraryX-navLink", {
						"main-yourLibraryX-navLinkActive": S.Platform.getHistory().location.pathanme.startsWith(appRoutePath),
					})}
					onClick={() => undefined}
					aria-label={localizedApp}
				>
					{createIconComponent({ icon, iconSize: 24 })}
					{createIconComponent({ icon: activeIcon, iconSize: 24 })}
					{!isSidebarCollapsed && <S.ReactComponents.Text variant="bodyMediumBold">{localizedApp}</S.ReactComponents.Text>}
				</I_O>
			</S.ReactComponents.Tooltip>
		</li>
	);
};
