import { S } from "/modules/Delusoire/std/index.js";
export const fetchArtistDiscography = (uri, offset = 0, limit = 100) => {
    const _fetchArtistDiscography = async (offset, limit) => {
        const res = await S.Platform.getGraphQLLoader()(S.GraphQLDefinitions.queryArtistDiscographyAll, {
            uri,
            offset,
            limit,
        });
        const { discography } = res.data.artistUnion;
        const { totalCount, items } = discography.all;
        if (offset + limit < totalCount)
            items.push(...(await _fetchArtistDiscography(offset + limit, limit)));
        return items;
    };
    return _fetchArtistDiscography(offset, limit);
};
