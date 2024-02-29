import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
function scrollGrid(event) {
    const { target } = event;
    if (!(target instanceof HTMLElement))
        return;
    const grid = target.parentNode?.querySelector("div");
    if (!grid)
        return;
    grid.scrollLeft += grid.clientWidth;
    if (grid.scrollWidth - grid.clientWidth - grid.scrollLeft <= grid.clientWidth) {
        grid.setAttribute("data-scroll", "end");
    }
    else {
        grid.setAttribute("data-scroll", "both");
    }
}
function scrollGridLeft(event) {
    const { target } = event;
    if (!(target instanceof HTMLElement))
        return;
    const grid = target.parentNode?.querySelector("div");
    if (!grid)
        return;
    grid.scrollLeft -= grid.clientWidth;
    if (grid.scrollLeft <= grid.clientWidth) {
        grid.setAttribute("data-scroll", "start");
    }
    else {
        grid.setAttribute("data-scroll", "both");
    }
}
function InlineGrid(props) {
    const { children, special } = props;
    return (S.React.createElement("section", { className: "stats-gridInlineSection" },
        S.React.createElement("button", { className: "stats-scrollButton", onClick: scrollGridLeft }, "<"),
        S.React.createElement("button", { className: "stats-scrollButton", onClick: scrollGrid }, ">"),
        S.React.createElement("div", { className: `iKwGKEfAfW7Rkx2_Ba4E stats-gridInline${special ? " stats-specialGrid" : ""}`, "data-scroll": "start" }, children)));
}
export default React.memo(InlineGrid);
