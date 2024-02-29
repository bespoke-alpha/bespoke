import { fp } from "/modules/std/deps.js";
import { S } from "/modules/std/index.js";
const genreLine = (name, value, limit, total) => {
    return (S.React.createElement("div", { className: "stats-genreRow" },
        S.React.createElement("div", { className: "stats-genreRowFill", style: {
                width: `calc(${(value / limit) * 100}% + ${((limit - value) / (limit - 1)) * 100}px)`,
            } },
            S.React.createElement("span", { className: "stats-genreText" }, name)),
        S.React.createElement("span", { className: "stats-genreValue" }, `${Math.round((value / total) * 100)}%`)));
};
const genreLines = (genres, total) => {
    return genres.map(([genre, value]) => {
        return genreLine(genre, value, genres[0][1], total);
    });
};
const genresCard = ({ genres }) => {
    const genresTotal = Object.values(genres).reduce(fp.add);
    const sortedTopGenres = Object.entries(genres)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    return S.React.createElement("div", { className: "LunqxlFIupJw_Dkx6mNx stats-genreCard" }, genreLines(sortedTopGenres, genresTotal));
};
export default genresCard;
