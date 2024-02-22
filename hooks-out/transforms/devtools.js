import { internalRegisterTransform } from "./transforms.js";
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/("incognito-enabled":[\w_$][\w_$\d]*)/, '$1,employee:"1"');
        str = str.replace(/("app.enable-developer-mode",)([\w_$][\w_$\d]*)/, "$1$2?2:0");
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
