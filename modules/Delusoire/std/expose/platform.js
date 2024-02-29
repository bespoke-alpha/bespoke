export function expose({ Platform }) {
    const Cosmos = Platform.getPlayerAPI()._cosmos;
    return { Platform, Cosmos };
}
