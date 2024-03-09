import { createIconComponent } from "../createIconComponent.js";
import { S } from "../../index.js";
import { SVGIcons } from "../../static.js";

const CheckIcon = () =>
	createIconComponent({
		icon: SVGIcons.check,
	});

interface MenuItemProps {
	option: string;
	isActive: boolean;
	onSwitch: (option: string) => void;
	children: React.ReactNode;
}
const DropdownMenuItem = ({ option, isActive, onSwitch, children }: MenuItemProps) => {
	const activeStyle = {
		backgroundColor: "rgba(var(--spice-rgb-selected-row),.1)",
	};

	return (
		<S.ReactComponents.MenuItem
			trigger="click"
			onClick={() => onSwitch(option)}
			data-checked={isActive}
			trailingIcon={isActive ? <CheckIcon /> : undefined}
			style={isActive ? activeStyle : undefined}
		>
			{children}
		</S.ReactComponents.MenuItem>
	);
};

export type DropdownOptions = Record<string, React.ReactNode>;

interface DropdownMenuProps<O extends DropdownOptions> {
	options: O;
	activeOption: keyof O;
	onSwitch: (option: keyof O) => void;
}
export default function <O extends DropdownOptions>({ options, activeOption, onSwitch }: DropdownMenuProps<O>) {
	const { ContextMenu, Menu, TextComponent } = S.ReactComponents;

	const DropdownMenu = props => {
		return (
			<Menu {...props}>
				{Object.entries(options).map(([option, children]) => (
					<DropdownMenuItem option={option} isActive={option === activeOption} onSwitch={onSwitch}>
						{children}
					</DropdownMenuItem>
				))}
			</Menu>
		);
	};

	return (
		<ContextMenu menu={<DropdownMenu />} trigger="click">
			<button className="x-sortBox-sortDropdown" type="button" role="combobox" aria-expanded="false">
				{/* <TextComponent variant="mesto" semanticColor="textSubdued">
					{options[activeOption]}
				</TextComponent> */}
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
}
