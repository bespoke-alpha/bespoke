/// <reference types="react" />
import { Registry } from "./registry.js";
declare const registry: Registry<import("react").ReactElement<any, string | import("react").JSXElementConstructor<any>>, void>;
export default registry;
export type NowPlayingWidgetProps = {
    label: string;
    icon?: string;
    onClick: () => void;
};
export declare const NowPlayingWidget: ({ label, icon, onClick }: NowPlayingWidgetProps) => JSX.Element;
