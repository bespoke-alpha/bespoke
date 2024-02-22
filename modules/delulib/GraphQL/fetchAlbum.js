import { S } from "../../std/index.js";
const queue = new Array();
export const fetchAlbum = async (uri, offset = 0, limit = 415) => {
    let resolveOwn;
    await new Promise(resolve => {
        queue.push((resolveOwn = resolve));
        if (queue.length < 1000) {
            resolve();
        }
    });
    const res = await S.Platform.getGraphQLLoader()(S.GraphQLDefinitions.getAlbum, {
        uri,
        locale: S.Locale.getLocaleForURLPath(),
        offset,
        limit,
    });
    const index = queue.findIndex(r => r === resolveOwn);
    if (index != -1) {
        queue.splice(index, 1);
    }
    queue[0]?.();
    return res.data.albumUnion;
};
