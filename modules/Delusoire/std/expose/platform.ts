export type Platform = PlatformAutoGen;

export type ExposedPlatform = ReturnType<typeof expose>;

export function expose({ Platform }: { Platform: Platform }) {
	const Cosmos = Platform.getPlayerAPI()._cosmos;

	return { Platform, Cosmos };
}
