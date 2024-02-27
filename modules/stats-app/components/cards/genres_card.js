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
const genresCard = ({ genres, total }) => {
    const genresArray = genres.sort(([, a], [, b]) => b - a).slice(0, 10);
    return S.React.createElement("div", { className: "LunqxlFIupJw_Dkx6mNx stats-genreCard" }, genreLines(genresArray, total));
};
export default genresCard;
