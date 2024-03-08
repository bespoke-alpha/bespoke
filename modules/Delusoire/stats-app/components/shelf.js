import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
function Shelf(props) {
    const { TextComponent } = S.ReactComponents;
    const { title, children } = props;
    return (S.React.createElement("section", { className: "main-shelf-shelf Shelf" },
        S.React.createElement("div", { className: "main-shelf-header" },
            S.React.createElement("div", { className: "main-shelf-topRow" },
                S.React.createElement("div", { className: "main-shelf-titleWrapper" },
                    S.React.createElement(TextComponent, { as: "h2", variant: "canon", semanticColor: "textBase" }, title)))),
        S.React.createElement("section", null, children)));
}
export default React.memo(Shelf);
