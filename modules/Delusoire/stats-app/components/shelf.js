import { S } from "/modules/std/index.js";
const { React } = S;
function Shelf(props) {
    const { TextComponent } = S.ReactComponents;
    const { title, children } = props;
    return (S.React.createElement("section", { className: "QyANtc_r7ff_tqrf5Bvc Shelf" },
        S.React.createElement("div", { className: "q8AZzDc_1BumBHZg0tZb" },
            S.React.createElement("div", { className: "OMuRYOdpUbGif12_lRJl" },
                S.React.createElement("div", { className: "onVWL7MW4PW9FyVajBAc" },
                    S.React.createElement(TextComponent, { as: "h2", variant: "canon", semanticColor: "textBase" }, title)))),
        S.React.createElement("section", null, children)));
}
export default React.memo(Shelf);
