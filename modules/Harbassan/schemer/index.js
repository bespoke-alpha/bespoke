import { S } from "/modules/Delusoire/stdlib/index.js";
import { SVGIcons, createRegistrar } from "/modules/Delusoire/stdlib/index.js";
import { display } from "/modules/Delusoire/stdlib/lib/modal.js";
import { Button } from "/modules/Delusoire/stdlib/src/registers/topbarLeftButton.js";
import SchemerModal from "./modal.js";
import schemeManager from "./schemes.js";
const SchemeEdit = ()=>{
    return /*#__PURE__*/ S.React.createElement(Button, {
        label: "playlist-stats",
        icon: SVGIcons.edit,
        onClick: ()=>{
            display({
                title: "Schemer",
                content: /*#__PURE__*/ S.React.createElement(SchemerModal, null),
                isLarge: true
            });
        }
    });
};
export default function(mod) {
    const registrar = createRegistrar(mod);
    registrar.register("topbarLeftButton", SchemeEdit);
    createSchemes();
}
function createSchemes() {
    schemeManager.createStatics([
        {
            name: "Spicetify",
            fields: {
                text: "#ffffff",
                subtext: "#c0b4b4",
                base: "#0a0a0f",
                main: "#0F111A",
                main_elevated: "#1b1e2c",
                highlight: "#1b1e2c",
                highlight_elevated: "#1b1e2c",
                card: "#0a0a0f",
                button: "#FF4151",
                button_active: "#ff5c69",
                notification: "#33bacc",
                tab: "#c0b4b4",
                tab_active: "#FF4151",
                playbar: "#c0b4b4",
                playbar_active: "#FF4151"
            }
        },
        {
            name: "Nord",
            fields: {
                text: "#eceff4",
                subtext: "#d8dee9",
                base: "#23272f",
                main: "#2e3440",
                main_elevated: "#3b4252",
                highlight: "#3b4252",
                highlight_elevated: "#434c5e",
                card: "#2e3440",
                button: "#8fbcbb",
                button_active: "#9fcbca",
                notification: "#88c0d0",
                tab: "#d8dee9",
                tab_active: "#81a1c1",
                playbar: "#81a1c1",
                playbar_active: "#8fbcbb"
            }
        }
    ], "schemer");
}
