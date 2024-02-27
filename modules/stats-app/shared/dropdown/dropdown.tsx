import { createIconComponent } from "/modules/std/api/createIconComponent.js";
import { S } from "/modules/std/index.js";

interface Option {
	id: string;
	name: string;
}

interface DropdownMenuProps {
	options: Option[];
	activeOption: Option;
	switchCallback: (option: Option) => void;
}

interface MenuItemProps {
	option: Option;
	isActive: boolean;
	switchCallback: (option: Option) => void;
}

const CheckIcon = () =>
	createIconComponent({
		icon: '<svg xmlns="http://www.w3.org/2000/svg"><path d="M15.53 2.47a.75.75 0 0 1 0 1.06L4.907 14.153.47 9.716a.75.75 0 0 1 1.06-1.06l3.377 3.376L14.47 2.47a.75.75 0 0 1 1.06 0z"/></svg>',
	});

const MenuItem = (props: MenuItemProps) => {
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
			{option.name}
		</S.ReactComponents.MenuItem>
	);
};

const DropdownMenu = (props: DropdownMenuProps) => {
	const { ContextMenu, Menu, TextComponent } = S.ReactComponents;
	const { options, activeOption, switchCallback } = props;

	const optionItems = options.map(option => {
		return <MenuItem option={option} isActive={option === activeOption} switchCallback={switchCallback} />;
	});

	const MenuWrapper = props => {
		return <Menu {...props}>{optionItems}</Menu>;
	};

	return (
		<ContextMenu menu={<MenuWrapper />} trigger="click">
			<button className="x-sortBox-sortDropdown" type="button" role="combobox" aria-expanded="false">
				<TextComponent variant="mesto" semanticColor="textSubdued">
					{activeOption.name}
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

export default DropdownMenu;
