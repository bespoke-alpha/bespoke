import { S, SVGIcons } from "/modules/Delusoire/stdlib/index.js";
import { useSearchBar } from "/modules/Delusoire/stdlib/lib/components/index.js";
import schemeManager from "./schemes.js";
import { createIconComponent } from "/modules/Delusoire/stdlib/lib/createIconComponent.js";
function isValidHex(hex) {
    const regex = /^#[0-9A-Fa-f]{6}$/;
    return regex.test(hex);
}
const SchemerModal = ()=>{
    const [modalScheme, setModalScheme] = S.React.useState(schemeManager.getCurrScheme());
    const [schemes, setSchemes] = S.React.useState(schemeManager.getSchemes());
    const [searchbar, search] = useSearchBar({
        placeholder: "Search Schemes",
        expanded: true
    });
    function setScheme(scheme) {
        setModalScheme(scheme);
        schemeManager.toggleScheme(scheme.name);
    }
    function updateField(name, value) {
        const newFields = {
            ...modalScheme.fields,
            [name]: value
        };
        setModalScheme({
            ...modalScheme,
            fields: newFields
        });
        if (!isValidHex(value)) return;
        schemeManager.updateLocal(modalScheme.name, newFields);
    }
    function addScheme() {
        setScheme(schemeManager.createLocal({
            name: "New Custom",
            fields: modalScheme.fields
        }));
        setSchemes(schemeManager.getSchemes());
    }
    function remScheme(scheme) {
        schemeManager.deleteLocal(scheme.name);
        setSchemes(schemeManager.getSchemes());
        setScheme(schemeManager.getScheme("def"));
    }
    function renameScheme(scheme, newName) {
        schemeManager.renameLocal(scheme.name, newName);
        setSchemes(schemeManager.getSchemes());
    }
    function copyObj() {
        const css = JSON.stringify(modalScheme);
        // @ts-ignore
        S.Platform.getClipboardAPI().copy(css);
    }
    const LocalInfo = ()=>{
        const [name, setName] = S.React.useState(modalScheme.name);
        return /*#__PURE__*/ S.React.createElement("div", {
            className: "scheme-info"
        }, /*#__PURE__*/ S.React.createElement("input", {
            className: "scheme-name",
            readOnly: !modalScheme.local,
            placeholder: "Custom Scheme",
            value: modalScheme.local ? name : `${name} (static)`,
            onChange: (e)=>setName(e.target.value)
        }), modalScheme.local && [
            /*#__PURE__*/ S.React.createElement("button", {
                onClick: ()=>remScheme(modalScheme)
            }, "Delete"),
            /*#__PURE__*/ S.React.createElement("button", {
                onClick: (e)=>renameScheme(modalScheme, name)
            }, "Rename")
        ], /*#__PURE__*/ S.React.createElement("button", {
            onClick: copyObj
        }, "Copy Object"));
    };
    const filteredSchemes = schemes.filter((scheme)=>scheme.name.toLowerCase().includes(search.toLowerCase()));
    return /*#__PURE__*/ S.React.createElement("div", {
        className: "schemer-container"
    }, /*#__PURE__*/ S.React.createElement("div", {
        className: "scheme-list-container"
    }, /*#__PURE__*/ S.React.createElement("ul", null, searchbar, /*#__PURE__*/ S.React.createElement(S.ReactComponents.MenuItem, {
        leadingIcon: createIconComponent({
            icon: SVGIcons.plus2px
        }),
        divider: "after",
        onClick: addScheme
    }, "Create New Local"), /*#__PURE__*/ S.React.createElement("ul", {
        className: "scheme-list"
    }, filteredSchemes.map((scheme)=>/*#__PURE__*/ S.React.createElement(S.ReactComponents.MenuItem, {
            onClick: ()=>setScheme(scheme)
        }, scheme.name))))), /*#__PURE__*/ S.React.createElement("div", {
        className: "splitter"
    }), /*#__PURE__*/ S.React.createElement("div", {
        className: "scheme-fields-container"
    }, /*#__PURE__*/ S.React.createElement(LocalInfo, null), /*#__PURE__*/ S.React.createElement("div", {
        className: "scheme-fields"
    }, Object.entries(modalScheme.fields).map(([name, value])=>/*#__PURE__*/ S.React.createElement("div", {
            className: "input-row"
        }, /*#__PURE__*/ S.React.createElement("label", null, name), /*#__PURE__*/ S.React.createElement("input", {
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
export default SchemerModal;
