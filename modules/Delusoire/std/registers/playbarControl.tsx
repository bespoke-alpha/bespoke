import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { internalRegisterTransform } from "../../../../hooks/transforms/index.js";
import { createIconComponent } from "../api/createIconComponent.js";

const registry = new Registry<React.ReactElement, void>();
export default registry;

globalThis.__renderPlaybarBarControls = registry.getItems.bind(registry, undefined, true);
internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/(children:\[)([^\[]*djJumpButtonFactory)/, "$1...__renderPlaybarBarControls(),$2");
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

export type PlaybarBarControlProps = {
	label: string;
	isActive?: boolean;
	isActiveNoIndicator?: boolean;
	disabled?: boolean;
	icon?: string;
	onClick: () => void;
};
export const PlaybarBarControl = ({
	label,
	isActive = false,
	isActiveNoIndicator = false,
	disabled = false,
	icon,
	onClick,
}: PlaybarBarControlProps) => {
	const [_isActive, _setIsActive] = S.React.useState(isActive);

	return (
		<S.ReactComponents.Tooltip label={label}>
			<S.ReactComponents.ButtonTertiary
				aria-label={label}
				size="small"
				className={`main-genericButton-button ${_isActive || isActiveNoIndicator ? "main-genericButton-buttonActive" : ""} ${
					_isActive ? "main-genericButton-buttonActiveDot" : ""
				}`}
				disabled={disabled}
				iconOnly={icon && (() => createIconComponent({ icon }))}
				onClick={() => {
					onClick();
					_setIsActive(!_isActive);
				}}
				data-active={_isActive.toString()}
				aria-pressed={_isActive}
			/>
		</S.ReactComponents.Tooltip>
	);
};
