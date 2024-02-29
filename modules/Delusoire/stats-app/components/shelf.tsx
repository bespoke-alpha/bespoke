import { S } from "/modules/Delusoirestd/index.js";
const { React } = S;

interface ShelfProps {
	title: string;
	children: React.ReactElement | React.ReactElement[];
}

function Shelf(props: ShelfProps): React.ReactElement {
	const { TextComponent } = S.ReactComponents;
	const { title, children } = props;

	return (
		<section className="main-shelf-shelf Shelf">
			<div className="main-shelf-header">
				<div className="main-shelf-topRow">
					<div className="main-shelf-titleWrapper">
						<TextComponent as="h2" variant="canon" semanticColor="textBase">
							{title}
						</TextComponent>
					</div>
				</div>
			</div>
			<section>{children}</section>
		</section>
	);
}

export default React.memo(Shelf);
