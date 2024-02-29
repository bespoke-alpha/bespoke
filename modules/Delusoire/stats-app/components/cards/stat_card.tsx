import { S } from "/modules/Delusoire/std/index.js";

interface StatCardProps {
	label: string;
	value: number | string;
}

function formatValue(name: string, value: string | number): string {
	if (typeof value === "string") return value;

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
				{formatValue(label, value)}
			</TextComponent>
			<TextComponent as="div" semanticColor="textBase" variant="balladBold">
				{normalizeString(label)}
			</TextComponent>
		</div>
	);
}

export default StatCard;
