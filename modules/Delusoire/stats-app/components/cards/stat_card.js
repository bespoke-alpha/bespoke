import { S } from "/modules/Delusoire/std/index.js";
function formatValue(name, value) {
    switch (name) {
        case "tempo":
            return `${Math.round(value)} bpm`;
        case "popularity":
            return `${Math.round(value)} %`;
        default:
            return `${Math.round(value * 100)} %`;
    }
}
function normalizeString(inputString) {
    return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}
function StatCard(props) {
    const { TextComponent } = S.ReactComponents;
    const { label, value } = props;
    return (S.React.createElement("div", { className: "LunqxlFIupJw_Dkx6mNx" },
        S.React.createElement(TextComponent, { as: "div", semanticColor: "textBase", variant: "alto" }, typeof value === "number" ? formatValue(label, value) : value),
        S.React.createElement(TextComponent, { as: "div", semanticColor: "textBase", variant: "balladBold" }, normalizeString(label))));
}
export default StatCard;
