type StatusProps = { icon: "error" | "library"; heading: string; subheading: string };
export const Status = (props: StatusProps) => {
	const [isVisible, setIsVisible] = React.useState(false);

	React.useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(true);
		}, 500);
		return () => clearTimeout(timer);
	}, []);

	return (
		isVisible && (
			<div className="loadingWrapper">
				{props.icon === "error" ? <ErrorIcon /> : <LibraryIcon />}
				<h1>{props.heading}</h1>
				<h3>{props.subheading}</h3>
			</div>
		)
	);
};
