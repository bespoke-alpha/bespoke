import { Registry } from "./registry.js";
import { S } from "../expose/index.js";
import { internalRegisterTransform } from "../../../../hooks/transforms/index.js";
import { createIconComponent } from "../api/createIconComponent.js";

const registry = new Registry<React.ReactElement, void>();
export default registry;

globalThis.__renderNowPlayingWidgets = registry.getItems.bind(registry);
internalRegisterTransform({
	transform: emit => str => {
		str = str.replace(/(hideButtonFactory[^\]]*)/, "$1,...__renderNowPlayingWidgets()");
		emit();
		return str;
	},
	glob: /^\/xpui\.js/,
});

export type NowPlayingWidgetProps = { label: string; icon?: string; onClick: () => void };
export const NowPlayingWidget = ({ label, icon, onClick }: NowPlayingWidgetProps) => (
	<S.ReactComponents.Tooltip label={label}>
		<S.ReactComponents.ButtonTertiary
			size="small"
			className={undefined}
			aria-label={label}
			condensed={false}
			iconOnly={icon && (() => createIconComponent({ icon }))}
			onClick={onClick}
		/>
	</S.ReactComponents.Tooltip>
);
