import { internalRegisterTransform } from "./transforms.js";
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/#181818/g, "var(--spice-player)");
        str = str.replace(/#212121/g, "var(--spice-player)");
        str = str.replace(/#282828/g, "var(--spice-card)");
        str = str.replace(/#121212/g, "var(--spice-main)");
        str = str.replace(/#242424/g, "var(--spice-main-elevated)");
        str = str.replace(/#1a1a1a/g, "var(--spice-highlight)");
        str = str.replace(/#2a2a2a/g, "var(--spice-highlight-elevated)");
        str = str.replace(/#000/g, "var(--spice-sidebar)");
        str = str.replace(/#000000/g, "var(--spice-sidebar)");
        str = str.replace(/white;/g, " var(--spice-text);");
        str = str.replace(/#fff/g, "var(--spice-text)");
        str = str.replace(/#ffffff/g, "var(--spice-text)");
        str = str.replace(/#f8f8f8/g, " var(--spice-text)");
        str = str.replace(/#b3b3b3/g, "var(--spice-subtext)");
        str = str.replace(/#a7a7a7/g, "var(--spice-subtext)");
        str = str.replace(/#1db954/g, "var(--spice-button)");
        str = str.replace(/#1877f2/g, "var(--spice-button)");
        str = str.replace(/#1ed760/g, "var(--spice-button-active)");
        str = str.replace(/#1fdf64/g, "var(--spice-button-active)");
        str = str.replace(/#169c46/g, "var(--spice-button-active)");
        str = str.replace(/#535353/g, "var(--spice-button-disabled)");
        str = str.replace(/#333/g, "var(--spice-tab-active)");
        str = str.replace(/#333333/g, "var(--spice-tab-active)");
        str = str.replace(/#7f7f7f/g, "var(--spice-misc)");
        str = str.replace(/#4687d6/g, "var(--spice-notification)");
        str = str.replace(/#2e77d0/g, "var(--spice-notification)");
        str = str.replace(/#e22134/g, "var(--spice-notification-error)");
        str = str.replace(/#cd1a2b/g, "var(--spice-notification-error)");
        str = str.replace(/rgba\(18,18,18,([\d\.]+)\)/g, "rgba(var(--spice-rgb-main),$1)");
        str = str.replace(/rgba\(40,40,40,([\d\.]+)\)/g, "rgba(var(--spice-rgb-card),$1)");
        str = str.replace(/rgba\(0,0,0,([\d\.]+)\)/g, "rgba(var(--spice-rgb-shadow),$1)");
        str = str.replace(/hsla\(0,0%,100%,\.9\)/g, "rgba(var(--spice-rgb-text),.9)");
        str = str.replace(/hsla\(0,0%,100%,([\d\.]+)\)/g, "rgba(var(--spice-rgb-selected-row),$1)");
        emit();
        return str;
    },
    glob: /.*.css$/g,
});
internalRegisterTransform({
    transform: emit => str => {
        str = str.replace(/"#1db954"/g, ' getComputedStyle(document.body).getPropertyValue("--spice-button").trim()');
        str = str.replace(/"#b3b3b3"/g, ' getComputedStyle(document.body).getPropertyValue("--spice-subtext").trim()');
        str = str.replace(/"#ffffff"/g, ' getComputedStyle(document.body).getPropertyValue("--spice-text").trim()');
        str = str.replace(/`color:"white"/g, 'color:"var(--spice-text)"');
        emit();
        return str;
    },
    glob: /.*.js$/g,
});
