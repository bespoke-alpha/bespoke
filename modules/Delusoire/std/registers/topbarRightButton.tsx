import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { createIconComponent } from "../api/createIconComponent.js";
import { registerTransform } from "../mixin.js";

const registry = new Registry<React.ReactElement, void>();
export default registry;

globalThis.__renderTopbarRightButtons = registry.getItems.bind(registry, undefined, true);
registerTransform({
	transform: emit => str => {
		str = str.replace(/("login-button"[^\}]*\}[^\}]*\}[^\}]*\}\))/, "$1,...__renderTopbarRightButtons()");
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

type ButtonProps = { label: string; disabled?: boolean; onClick: () => void; icon?: string };
export const Button = ({ label, disabled = false, onClick, icon }: ButtonProps) => (
	<S.ReactComponents.Tooltip label={label}>
		<button aria-label={label} disabled={disabled} className="encore-over-media-set main-topBar-buddyFeed" onClick={onClick}>
			{icon && createIconComponent({ icon, className: "main-topBar-icon" })}
		</button>
	</S.ReactComponents.Tooltip>
);
