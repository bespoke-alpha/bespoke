function CheckIcon() {
    return (S.React.createElement(Spicetify.ReactComponent.IconComponent, { iconSize: "16", semanticColor: "textBase", dangerouslySetInnerHTML: {
            __html: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z"/></svg>',
        } }));
}
const MenuItem = (props) => {
    const { ReactComponent } = Spicetify;
    const { option, isActive, switchCallback } = props;
    const activeStyle = {
        backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)",
    };
    return (S.React.createElement(ReactComponent.MenuItem, { trigger: "click", onClick: () => switchCallback(option), "data-checked": isActive, trailingIcon: isActive ? S.React.createElement(CheckIcon, null) : undefined, style: isActive ? activeStyle : undefined }, option.name));
};
const DropdownMenu = (props) => {
    const { ContextMenu, Menu, TextComponent } = Spicetify.ReactComponent;
    const { options, activeOption, switchCallback } = props;
    const optionItems = options.map(option => {
        return S.React.createElement(MenuItem, { option: option, isActive: option === activeOption, switchCallback: switchCallback });
    });
    const MenuWrapper = (props) => {
        return S.React.createElement(Menu, { ...props }, optionItems);
    };
    return (S.React.createElement(ContextMenu, { menu: S.React.createElement(MenuWrapper, null), trigger: "click" },
        S.React.createElement("button", { className: "w6j_vX6SF5IxSXrrkYw5", type: "button", role: "combobox", "aria-expanded": "false" },
            S.React.createElement(TextComponent, { variant: "mesto", semanticColor: "textSubdued" }, activeOption.name),
            S.React.createElement("svg", { role: "img", height: "16", width: "16", "aria-hidden": "true", className: "Svg-img-16 Svg-img-16-icon Svg-img-icon Svg-img-icon-small", viewBox: "0 0 16 16", "data-encore-id": "icon" },
                S.React.createElement("path", { d: "m14 6-6 6-6-6h12z" })))));
};
export default DropdownMenu;
