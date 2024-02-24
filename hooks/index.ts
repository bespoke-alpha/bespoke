import { modules } from "./module.js";
import { applyTransforms } from "./transforms/transforms.js";
import "./transforms/devtools.js";
import "./transforms/styledComponents.js";

await modules.reduce((p, module) => p.then(() => module.loadMixin()), Promise.resolve());
await Promise.all(["/vendor~xpui.js", "/xpui.js"].map(applyTransforms).map(async p => import(await p)));

import { internalModule } from "./module.js";
const { awaitedMixins } = internalModule;
console.info(awaitedMixins);
await Promise.all(awaitedMixins);

for (const module of modules) module.loadCSS();
modules.reduce((p, module) => p.then(() => module.loadJS()), Promise.resolve());
