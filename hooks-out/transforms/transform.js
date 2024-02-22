import { Paths } from "../static.js";
import { readFile } from "../util.js";
export class SourceFile {
    constructor(path) {
        this.path = path;
        this.transforms = new Array();
    }
    mixin(transform) {
        this.transforms.push(transform);
    }
    async getObjectURL() {
        if (this.objectURL)
            return this.objectURL;
        const content = await readFile(this.path);
        const modifiedContent = this.transforms.reduce((p, transform) => transform(p), content);
        const [ext] = this.path.match(/\..+$/) ?? [];
        const types = {
            ".js": "application/javascript",
            ".css": "text/css",
        };
        const type = types[ext];
        const blob = new Blob([modifiedContent], { type });
        this.objectURL = URL.createObjectURL(blob);
        return this.objectURL;
    }
}
export const sources = Paths.map(path => new SourceFile(path));
export const createRegisterTransform = (module) => ({ transform, then = () => { }, glob, noAwait = false }) => {
    const p = new Promise(resolve => {
        const _sources = Paths.map((path, i) => glob.test(path) && sources[i]).filter(Boolean);
        for (const source of _sources) {
            source.mixin(transform(resolve));
        }
    }).then(then);
    // @ts-ignore
    p.transform = transform;
    noAwait || module.awaitedMixins.push(p);
};
