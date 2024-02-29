import { S } from "/modules/Delusoire/std/index.js";
const { React } = S;
const ErrorIcon = () => {
    return (S.React.createElement("svg", { "data-encore-id": "icon", role: "img", "aria-hidden": "true", viewBox: "0 0 24 24", className: "status-icon" },
        S.React.createElement("path", { d: "M11 18v-2h2v2h-2zm0-4V6h2v8h-2z" }),
        S.React.createElement("path", { d: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM1 12C1 5.925 5.925 1 12 1s11 4.925 11 11-4.925 11-11 11S1 18.075 1 12z" })));
};
const LibraryIcon = () => {
    return (S.React.createElement("svg", { role: "img", height: "46", width: "46", "aria-hidden": "true", viewBox: "0 0 24 24", "data-encore-id": "icon", className: "status-icon" },
        S.React.createElement("path", { d: "M14.5 2.134a1 1 0 0 1 1 0l6 3.464a1 1 0 0 1 .5.866V21a1 1 0 0 1-1 1h-6a1 1 0 0 1-1-1V3a1 1 0 0 1 .5-.866zM16 4.732V20h4V7.041l-4-2.309zM3 22a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1zm6 0a1 1 0 0 1-1-1V3a1 1 0 0 1 2 0v18a1 1 0 0 1-1 1z" })));
};
const Status = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(() => {
        const to = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(to);
    }, []);
    return isVisible ? (S.React.createElement("div", { className: "loadingWrapper" },
        props.icon === "error" ? S.React.createElement(ErrorIcon, null) : S.React.createElement(LibraryIcon, null),
        S.React.createElement("h1", null, props.heading),
        S.React.createElement("h3", null, props.subheading))) : undefined;
};
export default Status;
