import { internalRegisterTransform } from "./transforms.js";

internalRegisterTransform({
	transform: emit => str => {
		emit();
		return str;
	},
	glob: /.*.css$/g,
});

internalRegisterTransform({
	transform: emit => str => {
		emit();
		return str;
	},
	glob: /.*.js$/g,
});
