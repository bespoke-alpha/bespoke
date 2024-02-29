import { S } from "/modules/Delusoirestd/index.js";

interface SpotifyCardProps {
	type: "artist" | "album" | "lastfm" | "playlist" | "show";
	uri: string;
	header: string;
	subheader: string;
	imageUrl: string;
}

function SpotifyCard(props: SpotifyCardProps): React.ReactElement<HTMLDivElement> {
	// @ts-ignore
	const { Cards, TextComponent, Menus, RightClickMenu } = S.ReactComponents;
	const { Default: Card, CardImage } = Cards;
	const { type, header, uri, imageUrl, subheader } = props;

	const getMenu = () => {
		switch (type) {
			case "artist":
				return <Menus.Artist uri={uri} />;
			case "album":
				return <Menus.Album uri={uri} />;
			case "playlist":
				return <Menus.Playlist uri={uri} />;
			case "show":
				return <Menus.PodcastShow uri={uri} />;
			default:
				return undefined;
		}
	};
	const lastfmProps = type === "lastfm" ? { onClick: () => window.open(uri, "_blank"), isPlayable: false, delegateNavigation: true } : {};

	return (
		<RightClickMenu menu={getMenu()}>
			<Card
				featureIdentifier={type}
				headerText={header}
				renderCardImage={() => (
					<CardImage
						images={[
							{
								height: 640,
								url: imageUrl,
								width: 640,
							},
						]}
						isCircular={type === "artist"}
					/>
				)}
				renderSubHeaderContent={() => (
					<TextComponent as="div" variant="mesto" semanticColor="textSubdued">
						{subheader}
					</TextComponent>
				)}
				uri={uri}
				{...lastfmProps}
			/>
		</RightClickMenu>
	);
}

export default SpotifyCard;
