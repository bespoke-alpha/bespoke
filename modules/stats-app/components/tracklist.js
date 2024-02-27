import { S } from "/modules/std/index.js";
const Tracklist = ({ minified = false, children }) => {
    return (S.React.createElement("div", { role: "grid", "aria-rowcount": minified ? 5 : 50, "aria-colcount": 4, className: "ShMHCGsT93epRGdxJp2w Ss6hr6HYpN4wjHJ9GHmi", tabIndex: 0 },
        !minified && (S.React.createElement("div", { className: "koyeY6AgGRPmyPITi7yO", role: "presentation" },
            S.React.createElement("div", { className: "dZPmmYYhskhqHJCAruvI wTUruPetkKdWAR1dd6w4", role: "row", "aria-rowindex": 1 },
                S.React.createElement("div", { className: "NZAU7CsuZsMeMQB8zYUu", role: "columnheader", "aria-colindex": 1, "aria-sort": "none", tabIndex: -1 }, "#"),
                S.React.createElement("div", { className: "gvLrgQXBFVW6m9MscfFA", role: "columnheader", "aria-colindex": 2, "aria-sort": "none", tabIndex: -1 },
                    S.React.createElement("button", { className: "ASYv4mEu1lXEHVa04HqY ZdBognHQ3X610bLWE3e3", tabIndex: -1 },
                        S.React.createElement("span", { className: "TypeElement-mesto-type standalone-ellipsis-one-line", "data-encore-id": "type" }, "Title"))),
                S.React.createElement("div", { className: "bfQ2S9bMXr_kJjqEfcwA", role: "columnheader", "aria-colindex": 3, "aria-sort": "none", tabIndex: -1 },
                    S.React.createElement("button", { className: "ASYv4mEu1lXEHVa04HqY ZdBognHQ3X610bLWE3e3", tabIndex: -1 },
                        S.React.createElement("span", { className: "TypeElement-mesto-type standalone-ellipsis-one-line", "data-encore-id": "type" }, "Album"))),
                S.React.createElement("div", { className: "HcMOFLaukKJdK5LfdHh0", role: "columnheader", "aria-colindex": 5, "aria-sort": "none", tabIndex: -1 },
                    S.React.createElement(S.ReactComponents.Tooltip, { label: "Duration", placement: "top" },
                        S.React.createElement("button", { "aria-label": "Duration", className: "ASYv4mEu1lXEHVa04HqY AgiCqnZUliKs_dafpdyi ZdBognHQ3X610bLWE3e3", tabIndex: -1 },
                            S.React.createElement("svg", { role: "img", height: "16", width: "16", "aria-hidden": "true", viewBox: "0 0 16 16", "data-encore-id": "icon", className: "Svg-img-16 Svg-img-16-icon Svg-img-icon Svg-img-icon-small" },
                                S.React.createElement("path", { d: "M8 1.5a6.5 6.5 0 1 0 0 13 6.5 6.5 0 0 0 0-13zM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8z" }),
                                S.React.createElement("path", { d: "M8 3.25a.75.75 0 0 1 .75.75v3.25H11a.75.75 0 0 1 0 1.5H7.25V4A.75.75 0 0 1 8 3.25z" })))))))),
        S.React.createElement("div", { className: "JUa6JJNj7R_Y3i4P8YUX", role: "presentation", style: { height: (minified ? 5 : 50) * 56 } },
            S.React.createElement("div", { role: "presentation" }, children))));
};
export default Tracklist;
