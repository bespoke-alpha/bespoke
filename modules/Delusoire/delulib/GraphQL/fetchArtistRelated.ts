import { S } from "/modules/Delusoirestd/index.js";

type fetchArtistRelatedRes = Array<{
	id: string;
	uri: string;
	profile: {
		name: string;
	};
	visuals: {
		avatarImage: {
			sources: Array<Platform.ImageSized>;
		};
	};
}>;
export const fetchArtistRelated = async (uri: string) => {
	const res = await S.Platform.getGraphQLLoader()(S.GraphQLDefinitions.queryArtistRelated, {
		uri,
		locale: S.Locale.getLocaleForURLPath(),
	});

	return res.data.artistUnion.relatedContent.relatedArtists.items as fetchArtistRelatedRes;
};
