import { internalRegisterTransform } from "./index.js";
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/("incognito-enabled":[\w_\$][\w_\$\d]*)/, '$1,employee:"1"');
        str = str.replace(/([\w_\$][\w_\$\d]*)\("app\.enable-developer-mode",([\w_\$][\w_\$\d]*)\)/, '$1("app.enable-developer-mode",$2);$1("app-developer",$2?2:0)');
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
