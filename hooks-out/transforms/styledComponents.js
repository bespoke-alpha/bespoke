import { internalRegisterTransform } from "./index.js";
internalRegisterTransform({
    transform: emit => str => {
        // https://github.com/styled-components/styled-components/blob/22e8b7f233e12500a68be4268b1d79c5d7f2a661/packages/styled-components/src/models/ComponentStyle.ts#L88
        str = str.replace(/(\w+ [\w$_]+)=([\w$_]+\([\w$_]+>>>0\))/, "$1=__getStyledClassName(arguments,this,$2)");
        globalThis.__getStyledClassName = ([executionContext], componentStyle, // ComponentStyle from styled-components
        name) => {
            if (!executionContext)
                return name;
            const className = /(?:\w+__)?(\w+)-[\w-]+/.exec(componentStyle.componentId)?.[1];
            const isValidString = (v) => typeof v === "string" && v.length > 0;
            const isValidNumber = (v) => typeof v === "number";
            const parseProp = ([k, v]) => ((isValidString(v) || isValidNumber(v)) && `${k}_${v}`) || (v && k);
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
            const boolCastedKeys = ["iconLeading", "iconTrailing", "iconOnly"];
            const stringCastedKeys = [/.*padding.*/, /.*blocksize.*/];
            const restrictedBoolKeys = [/^aria-.*/, /^children$/, /^className$/, /^\$autoMirror$/];
            const parsePair = ([k, v]) => {
                if (!includedKeys.includes(v)) {
                    if ((v && boolCastedKeys.includes(k)) || (v === true && restrictedBoolKeys.every(r => !r.test(k)))) {
                        return k;
                    }
                    if (isValidString(v) && stringCastedKeys.some(r => r.test(k))) {
                        return `${k}_${v}`;
                    }
                    return;
                }
                return parseProp([k, v]);
            };
            return (className +
                "-" +
                Object.entries(executionContext)
                    .map(parsePair)
                    .filter(Boolean)
                    .sort()
                    .join("-")
                    .replaceAll("$", "")
                    .replace(/[^\w-]/g, "_"));
        };
        emit();
        return str;
    },
    glob: /^\/vendor~xpui\.js/,
});
