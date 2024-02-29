import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";
import { S, SVGIcons } from "/modules/Delusoire/std/index.js";

const CheckIcon = () =>
	createIconComponent({
		icon: SVGIcons.check,
	});

interface MenuItemProps {
	option: string;
	isActive: boolean;
	switchCallback: (option: string) => void;
}
const DropdownMenuItem = (props: MenuItemProps) => {
	const { option, isActive, switchCallback } = props;

	const activeStyle = {
		backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)",
	};

	return (
		<S.ReactComponents.MenuItem
			trigger="click"
			onClick={() => switchCallback(option)}
			data-checked={isActive}
			trailingIcon={isActive ? <CheckIcon /> : undefined}
			style={isActive ? activeStyle : undefined}
		>
			{option}
		</S.ReactComponents.MenuItem>
	);
};

interface DropdownMenuProps {
	options: readonly string[];
	activeOption: string;
	switchCallback: (option: string) => void;
}
const Dropdown = (props: DropdownMenuProps) => {
	const { ContextMenu, Menu, TextComponent } = S.ReactComponents;
	const { options, activeOption, switchCallback } = props;

	const DropdownMenu = props => {
		return (
			<Menu {...props}>
				{options.map(option => (
					<DropdownMenuItem option={option} isActive={option === activeOption} switchCallback={switchCallback} />
				))}
			</Menu>
		);
	};

	return (
		<ContextMenu menu={<DropdownMenu />} trigger="click">
			<button className="x-sortBox-sortDropdown" type="button" role="combobox" aria-expanded="false">
				<TextComponent variant="mesto" semanticColor="textSubdued">
					{activeOption}
				</TextComponent>
				<svg
					role="img"
					height="16"
					width="16"
					aria-hidden="true"
					className="Svg-img-16 Svg-img-16-icon Svg-img-icon Svg-img-icon-small"
					viewBox="0 0 16 16"
					data-encore-id="icon"
				>
					<path d="m14 6-6 6-6-6h12z" />
				</svg>
			</button>
		</ContextMenu>
	);
};

export default Dropdown;
