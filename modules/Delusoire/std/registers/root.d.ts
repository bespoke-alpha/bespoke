import { Predicate, Registry } from "./registry.js";
import type { ReactElement } from "react";
declare class R extends Registry<React.ReactElement, void> {
    register(item: ReactElement, predicate: Predicate<void>): ReactElement;
    unregister(item: ReactElement): ReactElement;
}
declare const registry: R;
export default registry;
