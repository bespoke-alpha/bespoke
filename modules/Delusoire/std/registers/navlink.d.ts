/// <reference types="react" />
import { Registry } from "./registry.js";
declare const registry: Registry<import("react").FC<{}>, void>;
export default registry;
export type NavLinkProps = {
    localizedApp: string;
    appRoutePath: string;
    icon: string;
    activeIcon: string;
};
export declare const NavLink: ({ localizedApp, appRoutePath, icon, activeIcon }: NavLinkProps) => JSX.Element;
