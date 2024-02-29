import { S } from "/modules/Delusoirestd/index.js";

interface StatCardProps {
	label: string;
	value: number | string;
}

function formatValue(name: string, value: number): string {
	switch (name) {
		case "tempo":
			return `${Math.round(value)} bpm`;
		case "popularity":
			return `${Math.round(value)} %`;
		default:
			return `${Math.round(value * 100)} %`;
	}
}

function normalizeString(inputString: string): string {
	return inputString.charAt(0).toUpperCase() + inputString.slice(1).toLowerCase();
}

function StatCard(props: StatCardProps): React.ReactElement<HTMLDivElement> {
	const { TextComponent } = S.ReactComponents;
	const { label, value } = props;

	return (
		<div className="main-card-card">
			<TextComponent as="div" semanticColor="textBase" variant="alto">
				{typeof value === "number" ? formatValue(label, value) : value}
			</TextComponent>
			<TextComponent as="div" semanticColor="textBase" variant="balladBold">
				{normalizeString(label)}
			</TextComponent>
		</div>
	);
}

export default StatCard;
