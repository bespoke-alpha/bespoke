import { Registry } from "./registry.js";
import { registerTransform } from "../mixin.js";
const registry = new Registry();
export default registry;
globalThis.__renderRoutes = registry.getItems.bind(registry);
registerTransform({
    transform: emit => str => {
        str = str.replace(/(\(0,[\w_\$][\w_\$\d]*\.jsx\)\([\w_\$][\w_\$\d]*\.[\w_\$][\w_\$\d]*,\{[^\{]*path:"\/search\/\*")/, "...__renderRoutes(),$1");
        emit();
        return str;
    },
    glob: /^\/xpui\.js/,
});
