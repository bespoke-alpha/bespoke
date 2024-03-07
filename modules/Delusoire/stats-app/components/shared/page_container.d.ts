/// <reference types="react" />
import { CreatePlaylistButtonProps } from "../buttons/create_playlist_button.js";
interface PageContainerProps {
    title: string;
    createPlaylistButtonProps?: CreatePlaylistButtonProps;
    headerEls?: React.ReactElement | React.ReactElement[];
    children: React.ReactElement | React.ReactElement[];
}
declare const PageContainer: (props: PageContainerProps) => JSX.Element;
export default PageContainer;
