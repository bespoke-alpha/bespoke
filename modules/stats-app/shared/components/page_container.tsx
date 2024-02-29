import CreatePlaylistButton, { CreatePlaylistButtonProps } from "../../components/buttons/create_playlist_button.js";

import { S } from "/modules/std/index.js";

interface PageContainerProps {
	title: string;
	createPlaylistButtonProps?: CreatePlaylistButtonProps;
	headerEls?: React.ReactElement | React.ReactElement[];
	children: React.ReactElement | React.ReactElement[];
}

const PageContainer = (props: PageContainerProps) => {
	const { title, createPlaylistButtonProps, headerEls, children } = props;
	const { TextComponent } = S.ReactComponents;
	return (
		<section className="contentSpacing">
			<div className={"page-header"}>
				<div className="header-left">
					<TextComponent as="h1" variant="canon" semanticColor="textBase">
						{title}
					</TextComponent>
					{createPlaylistButtonProps && <CreatePlaylistButton {...createPlaylistButtonProps} />}
				</div>
				<div className="header-right">{headerEls}</div>
			</div>
			<div className={"page-content"}>{children}</div>
		</section>
	);
};

export default PageContainer;
