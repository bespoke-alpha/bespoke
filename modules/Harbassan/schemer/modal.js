import { S, SVGIcons } from "/modules/Delusoire/stdlib/index.js";
import { useSearchBar } from "/modules/Delusoire/stdlib/lib/components/index.js";
import paletteManager from "./paletteManager.js";
import { createIconComponent } from "/modules/Delusoire/stdlib/lib/createIconComponent.js";
import { startCase } from "/modules/Delusoire/stdlib/deps.js";
function isValidHex(hex) {
    const regex = /^#[0-9A-Fa-f]{6}$/;
    return regex.test(hex);
}
const Modal = ()=>{
    const [modalPalette, setModalPalette] = S.React.useState(paletteManager.getCurrPalette());
    const [palettes, setPalettes] = S.React.useState(paletteManager.getPalettes());
    const [searchbar, search] = useSearchBar({
        placeholder: "Search Palettes",
        expanded: true
    });
    function setPalette(palette) {
        setModalPalette(palette);
        paletteManager.togglePalette(palette.name);
    }
    function updateField(name, value) {
        const newFields = {
            ...modalPalette.fields,
            [name]: value
        };
        setModalPalette({
            ...modalPalette,
            fields: newFields
        });
        if (!isValidHex(value)) return;
        paletteManager.updateLocal(modalPalette.name, newFields);
    }
    function addPalette() {
        setPalette(paletteManager.createLocal({
            name: "New Custom",
            fields: modalPalette.fields
        }));
        setPalettes(paletteManager.getPalettes());
    }
    function remPalette(palette) {
        paletteManager.deleteLocal(palette.name);
        setPalettes(paletteManager.getPalettes());
        setPalette(paletteManager.getPalette("def"));
    }
    function renamePalette(palette, newName) {
        paletteManager.renameLocal(palette.name, newName);
        setPalettes(paletteManager.getPalettes());
    }
    function copyObj() {
        const css = JSON.stringify(modalPalette);
        // @ts-ignore
        S.Platform.getClipboardAPI().copy(css);
    }
    const LocalInfo = ()=>{
        const [name, setName] = S.React.useState(modalPalette.name);
        return /*#__PURE__*/ S.React.createElement("div", {
            className: "palette-info"
        }, /*#__PURE__*/ S.React.createElement("input", {
            className: "palette-name",
            readOnly: !modalPalette.local,
            placeholder: "Custom Palette",
            value: modalPalette.local ? name : `${name} (static)`,
            onChange: (e)=>setName(e.target.value)
        }), modalPalette.local && [
            /*#__PURE__*/ S.React.createElement("button", {
                onClick: ()=>remPalette(modalPalette)
            }, "Delete"),
            /*#__PURE__*/ S.React.createElement("button", {
                onClick: (e)=>renamePalette(modalPalette, name)
            }, "Rename")
        ], /*#__PURE__*/ S.React.createElement("button", {
            onClick: copyObj
        }, "Copy Object"));
    };
    const filteredPalettes = palettes.filter((palette)=>palette.name.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ S.React.createElement("div", {
        className: "palette-modal-container"
    }, /*#__PURE__*/ S.React.createElement("div", {
        className: "palette-list-container"
    }, /*#__PURE__*/ S.React.createElement("ul", null, searchbar, /*#__PURE__*/ S.React.createElement(S.ReactComponents.MenuItem, {
        leadingIcon: createIconComponent({
            icon: SVGIcons.plus2px
        }),
        divider: "after",
        onClick: addPalette
    }, "Create New Palette"), /*#__PURE__*/ S.React.createElement("ul", {
        className: "palette-list"
    }, filteredPalettes.map((palette)=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.MenuItem, {
            trailingIcon: palette.name == modalPalette.name && createIconComponent({
                icon: SVGIcons.check
            }),
            onClick: ()=>setPalette(palette)
        }, palette.name))))), /*#__PURE__*/ S.React.createElement("div", {
        className: "palette-fields-container"
    }, /*#__PURE__*/ S.React.createElement(LocalInfo, null), /*#__PURE__*/ S.React.createElement("div", {
        className: "palette-fields"
    }, Object.entries(modalPalette.fields).map(([name, value])=>/*#__PURE__*/ S.React.createElement("div", {
            className: "input-row"
        }, /*#__PURE__*/ S.React.createElement("label", null, startCase(name)), /*#__PURE__*/ S.React.createElement("input", {
            className: "color-input",
            type: "color",
            value: value,
            onChange: (e)=>updateField(name, e.target.value)
        }), /*#__PURE__*/ S.React.createElement("input", {
            className: "text-input",
            type: "text",
            value: value,
            onChange: (e)=>updateField(name, e.target.value)
        }))))));
};
export default Modal;
