import { fp } from "/modules/std/deps.js";
import { S } from "/modules/std/index.js";

const genreLine = (name: string, value: number, limit: number, total: number) => {
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

const genreLines = (genres: [string, number][], total: number) => {
	return genres.map(([genre, value]) => {
		return genreLine(genre, value, genres[0][1], total);
	});
};

const genresCard = ({ genres }: { genres: Record<string, number> }) => {
	const genresTotal = Object.values(genres).reduce(fp.add);
	const sortedTopGenres = Object.entries(genres)
		.sort((a, b) => b[1] - a[1])
		.slice(0, 10);

	return <div className={"main-card-card stats-genreCard"}>{genreLines(sortedTopGenres, genresTotal)}</div>;
};

export default genresCard;
