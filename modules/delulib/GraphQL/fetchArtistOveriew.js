import { S } from "../../std/index.js";
export const fetchArtistOverview = async (uri) => {
    const res = await S.Platform.getGraphQLLoader()(S.GraphQLDefinitions.queryArtistOverview, {
        uri,
        locale: S.Locale.getLocaleForURLPath(),
        includePrerelease: true,
    });
    return res.data.artistUnion;
};
