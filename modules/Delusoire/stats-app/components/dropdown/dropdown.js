import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";
import { S, SVGIcons } from "/modules/Delusoire/std/index.js";
const CheckIcon = () => createIconComponent({
    icon: SVGIcons.check,
});
const DropdownMenuItem = (props) => {
    const { option, isActive, switchCallback } = props;
    const activeStyle = {
        backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)",
    };
    return (S.React.createElement(S.ReactComponents.MenuItem, { trigger: "click", onClick: () => switchCallback(option), "data-checked": isActive, trailingIcon: isActive ? S.React.createElement(CheckIcon, null) : undefined, style: isActive ? activeStyle : undefined }, option));
};
const Dropdown = (props) => {
    const { ContextMenu, Menu, TextComponent } = S.ReactComponents;
    const { options, activeOption, switchCallback } = props;
    const DropdownMenu = props => {
        return (S.React.createElement(Menu, { ...props }, options.map(option => (S.React.createElement(DropdownMenuItem, { option: option, isActive: option === activeOption, switchCallback: switchCallback })))));
    };
    return (S.React.createElement(ContextMenu, { menu: S.React.createElement(DropdownMenu, null), trigger: "click" },
        S.React.createElement("button", { className: "w6j_vX6SF5IxSXrrkYw5", type: "button", role: "combobox", "aria-expanded": "false" },
            S.React.createElement(TextComponent, { variant: "mesto", semanticColor: "textSubdued" }, activeOption),
            S.React.createElement("svg", { role: "img", height: "16", width: "16", "aria-hidden": "true", className: "Svg-img-16 Svg-img-16-icon Svg-img-icon Svg-img-icon-small", viewBox: "0 0 16 16", "data-encore-id": "icon" },
                S.React.createElement("path", { d: "m14 6-6 6-6-6h12z" })))));
};
export default Dropdown;
