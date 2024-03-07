import { internalRegisterTransform } from "./index.js";
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/(\w+ [\w$_]+)=[\w$_]+\([\w$_]+>>>0\)/, "$1=__getStyledClassName(arguments,this)");
        globalThis.__getStyledClassName = ([executionContext], componentStyle) => {
            if (!executionContext)
                return;
            let className = /(?:\w+__)?(\w+)-[\w-]+/.exec(componentStyle.componentId)?.[1];
            const includedKeys = [
                "role",
                "variant",
                "semanticColor",
                "iconColor",
                "color",
                "weight",
                "buttonSize",
                "iconSize",
                "position",
                "data-encore-id",
                "$size",
                "$iconColor",
            ];
            for (const key of includedKeys) {
                const value = executionContext[key];
                if ((typeof value === "string" && value !== "") || typeof value === "number") {
                    className += `-${value}`;
                }
            }
            {
                const childrenProps = ["iconLeading", "iconTrailing", "iconOnly"];
                for (const key of childrenProps) {
                    if (executionContext[key])
                        className += `-${key}`;
                }
            }
            {
                const excludedPrefix = ["aria-"];
                const excludedKeys = ["children", "className", "style", "dir", "key", "ref", "as", "$autoMirror", ""];
                const booleanKeys = Object.keys(executionContext).filter(key => typeof executionContext[key] === "boolean" && executionContext[key]);
                for (const key of booleanKeys) {
                    if (excludedKeys.includes(key))
                        continue;
                    if (excludedPrefix.some(prefix => key.startsWith(prefix)))
                        continue;
                    className += `-${key}`;
                }
            }
            {
                const customKeys = ["padding", "blocksize"];
                const customEntries = Object.entries(executionContext).filter(([key, value]) => customKeys.some(k => key.toLowerCase().includes(k)) && typeof value === "string" && value.length);
                for (const [key, value] of customEntries) {
                    className += `-${key}_${value.replace(/[^a-z0-9]/gi, "_")}`;
                }
            }
            return className;
        };
        emit();
        return str;
    },
    glob: /^\/vendor~xpui\.js/,
});
