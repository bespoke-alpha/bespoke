import { internalRegisterTransform } from "./index.js";

internalRegisterTransform({
	transform: emit => str => {
		// https://github.com/styled-components/styled-components/blob/22e8b7f233e12500a68be4268b1d79c5d7f2a661/packages/styled-components/src/models/ComponentStyle.ts#L88
		str = str.replace(/(\w+ [\w$_]+)=([\w$_]+\([\w$_]+>>>0\))/, "$1=__getStyledClassName(arguments,this,$2)");
		globalThis.__getStyledClassName = (
			[executionContext]: [Record<string, any>],
			componentStyle: any, // ComponentStyle from styled-components
			name: string,
		) => {
			if (!executionContext) return name;

			const className = /(?:\w+__)?(\w+)-[\w-]+/.exec(componentStyle.componentId)[1];

			const isValidString = (v: unknown) => typeof v === "string" && v.length > 0;
			const isValidNumber = (v: unknown) => typeof v === "number";
			const parseProp = ([k, v]: [string, unknown]) => ((isValidString(v) || isValidNumber(v)) && `${k}_${v}`) || (v && k);

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

			const stringCastedKeys = [/padding/, /blocksize/];

			const restrictedBoolKeys = [/^aria-/, /^className$/, /^style$/, /^dir$/, /^key$/, /^ref$/, /^as$/, /^$autoMirror$/, /^$/];

			const parsePair = ([k, v]: [string, any]) => {
				if (!includedKeys.includes(v)) {
					if (v && boolCastedKeys.includes(k)) {
						return k;
					}
					if (v === true && restrictedBoolKeys.every(r => !r.test(k))) {
						return k;
					}
					if (isValidString(v) && stringCastedKeys.some(r => r.test(k))) {
						return `${k}_${v}`;
					}
					return;
				}
				return parseProp([k, v]);
			};

			return (
				className +
				"-" +
				Object.entries(executionContext)
					.map(parsePair)
					.filter(Boolean)
					.sort()
					.join("-")
					.replaceAll("$", "")
					.replace(/[^\w-]/g, "_") +
				name
			);
		};
		emit();
		return str;
	},
	glob: /^\/vendor~xpui\.js/,
});
