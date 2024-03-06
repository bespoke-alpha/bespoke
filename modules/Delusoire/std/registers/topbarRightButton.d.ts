/// <reference types="react" />
import { Registry } from "./registry.js";
declare const registry: Registry<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, void>;
export default registry;
type ButtonProps = {
    label: string;
    disabled?: boolean;
    onClick: () => void;
    icon?: string;
};
export declare const Button: ({ label, disabled, onClick, icon }: ButtonProps) => JSX.Element;
