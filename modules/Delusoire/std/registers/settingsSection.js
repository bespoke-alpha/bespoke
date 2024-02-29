import { Registry } from "./registry.js";
import { internalRegisterTransform } from "/hooks/transforms/transforms.js";
const registry = new Registry();
export default registry;
globalThis.__renderSettingSections = registry.getItems.bind(registry);
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/(\(0,[\w_\$][\w_\$\d]*\.jsx\)\([\w_\$][\w_\$\d]*,{settings:[\w_\$][\w_\$\d]*,setValue:[\w_\$][\w_\$\d]*}\))]/, "$1,...__renderSettingSections()]");
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
