import { S } from "/modules/Delusoire/std/index.js";
function SpotifyCard(props) {
    // @ts-ignore
    const { Cards, TextComponent, Menus, RightClickMenu } = S.ReactComponents;
    const { Default: Card, CardImage } = Cards;
    const { type, header, uri, imageUrl, subheader } = props;
    const getMenu = () => {
        switch (type) {
            case "artist":
                return S.React.createElement(Menus.Artist, { uri: uri });
            case "album":
                return S.React.createElement(Menus.Album, { uri: uri });
            case "playlist":
                return S.React.createElement(Menus.Playlist, { uri: uri });
            case "show":
                return S.React.createElement(Menus.PodcastShow, { uri: uri });
            default:
                return undefined;
        }
    };
    const lastfmProps = type === "lastfm" ? { onClick: () => window.open(uri, "_blank"), isPlayable: false, delegateNavigation: true } : {};
    return (S.React.createElement(RightClickMenu, { menu: getMenu() },
        S.React.createElement(Card, { featureIdentifier: type, headerText: header, renderCardImage: () => (S.React.createElement(CardImage, { images: [
                    {
                        height: 640,
                        url: imageUrl,
                        width: 640,
                    },
                ], isCircular: type === "artist" })), renderSubHeaderContent: () => (S.React.createElement(TextComponent, { as: "div", variant: "mesto", semanticColor: "textSubdued" }, subheader)), uri: uri, ...lastfmProps })));
}
export default SpotifyCard;
