import { internalRegisterTransform } from "./index.js";

internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/("incognito-enabled":[a-zA-Z_\$][\w\$]*)/, '$1,employee:"1"');
		str = str.replace(
			/([a-zA-Z_\$][\w\$]*)\("app\.enable-developer-mode",([a-zA-Z_\$][\w\$]*)\)/,
			'$1("app.enable-developer-mode",$2);$1("app-developer",$2?2:0)',
		);
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});
