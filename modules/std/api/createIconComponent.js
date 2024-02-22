import { S } from "../expose/expose.js";
export const createIconComponent = ({ icon, iconSize = 16, ...props }) => {
    return (S.React.createElement(S.ReactComponents.IconComponent, { autoMirror: false, iconSize: iconSize, viewBox: `0 0 ${iconSize} ${iconSize}`, dangerouslySetInnerHTML: { __html: icon }, ...props }));
};
