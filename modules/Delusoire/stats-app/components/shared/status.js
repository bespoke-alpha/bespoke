export const Status = (props) => {
    const [isVisible, setIsVisible] = React.useState(false);
    React.useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    return (isVisible && (S.React.createElement("div", { className: "loadingWrapper" },
        props.icon === "error" ? S.React.createElement(ErrorIcon, null) : S.React.createElement(LibraryIcon, null),
        S.React.createElement("h1", null, props.heading),
        S.React.createElement("h3", null, props.subheading))));
};
