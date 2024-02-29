import { searchTracksDefinition } from "./Definitions/searchTracks.js";
import { S } from "/modules/Delusoire/std/index.js";
export const searchTracks = async (q, offset = 0, limit = 50, topResultsNum = 20, includeAudiobooks = true) => {
    const res = await S.Platform.getGraphQLLoader()(searchTracksDefinition, {
        searchTerm: q,
        offset,
        limit,
        numberOfTopResults: topResultsNum,
        includeAudiobooks,
    });
    return res.data.searchV2.tracksV2.items;
};
