import { fp } from "/modules/Delusoire/std/deps.js";
import { S } from "/modules/Delusoire/std/index.js";

const ContributionLine = (name: string, value: number, limit: number, total: number) => {
	return (
		<div className="stats-genreRow">
			<div
				className="stats-genreRowFill"
				style={{
					width: `calc(${(value / limit) * 100}% + ${((limit - value) / (limit - 1)) * 100}px)`,
				}}
			>
				<span className="stats-genreText">{name}</span>
			</div>
			<span className="stats-genreValue">{`${Math.round((value / total) * 100)}%`}</span>
		</div>
	);
};

const ContributionChart = ({ contributions }: { contributions: Record<string, number> }) => {
	const genresTotal = Object.values(contributions).reduce(fp.add);
	const sortedTopGenres = Object.entries(contributions)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10);

	return (
		<div className={"main-card-card stats-genreCard"}>
			{sortedTopGenres.map(([genre, value]) => {
				return ContributionLine(genre, value, sortedTopGenres[0][1], genresTotal);
			})}
		</div>
	);
};

export default ContributionChart;
