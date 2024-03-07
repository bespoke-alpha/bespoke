/// <reference types="react" />
interface SpotifyCardProps {
    type: "artist" | "album" | "lastfm" | "playlist" | "show";
    uri: string;
    header: string;
    subheader: string;
    imageUrl: string;
}
declare function SpotifyCard(props: SpotifyCardProps): React.ReactElement<HTMLDivElement>;
export default SpotifyCard;
