/// <reference types="react" />
import { Registry } from "./registry.js";
declare const registry: Registry<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, void>;
export default registry;
export type PlaybarBarControlProps = {
    label: string;
    isActive?: boolean;
    isActiveNoIndicator?: boolean;
    disabled?: boolean;
    icon?: string;
    onClick: () => void;
};
export declare const PlaybarBarControl: ({ label, isActive, isActiveNoIndicator, disabled, icon, onClick, }: PlaybarBarControlProps) => JSX.Element;
