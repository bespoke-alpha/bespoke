import { createRegistrar, createSettings } from "/modules/Delusoire/std/index.js";
import { S } from "/modules/Delusoire/std/index.js";
const { URI } = S;
export let settings;
export default async function (mod) {
    const registrar = createRegistrar(mod);
    settings = createSettings(mod);
    const { FolderPickerMenuItem } = await import("./starRatings.js");
    registrar.register("menu", S.React.createElement(FolderPickerMenuItem, null), ({ props }) => {
        return URI.is.Folder(props?.reference?.uri);
    });
}
