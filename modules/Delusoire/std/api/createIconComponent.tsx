import { S } from "../expose/index.js";

export const createIconComponent = ({ icon, iconSize = 16, ...props }: { [k: string]: any; icon: string; iconSize?: number }) => {
	return (
		<S.ReactComponents.IconComponent
			autoMirror={false}
			iconSize={iconSize}
			viewBox={`0 0 ${iconSize} ${iconSize}`}
			dangerouslySetInnerHTML={{ __html: icon }}
			{...props}
		/>
	);
};
