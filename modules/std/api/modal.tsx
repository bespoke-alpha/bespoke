import { S } from "../expose/expose.js";
import { _ } from "/hooks/deps.js";

import RootRegistry from "../registers/root.js";

let close: (() => void) | undefined = undefined;
let ref: React.ReactElement | undefined = undefined;

export function display({
	title: contentLabel,
	content: children,
	isLarge: isEmbedWidgetGeneratorOrTrackCreditsModal,
}: {
	title: string;
	content: React.ReactElement;
	isLarge: boolean;
}) {
	hide();

	const PopupModal = () => {
		const [isOpen, setIsOpen] = S.React.useState(true);

		// TODO: useRef and ref.remove() a wrapper div?
		close = () => setIsOpen(false);

		return (
			<S.ReactComponents.GenericModal isOpen={isOpen} contentLabel={contentLabel}>
				<div className={isEmbedWidgetGeneratorOrTrackCreditsModal ? "main-embedWidgetGenerator-container" : "main-trackCreditsModal-container"}>
					<S.ReactComponents.Text as="h1" variant={isEmbedWidgetGeneratorOrTrackCreditsModal ? "titleSmall" : "titleMedium"}>
						{contentLabel}
					</S.ReactComponents.Text>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						className={isEmbedWidgetGeneratorOrTrackCreditsModal ? "main-embedWidgetGenerator-closeBtn" : "main-trackCreditsModal-closeBtn"}
						onClick={close}
					>
						{isEmbedWidgetGeneratorOrTrackCreditsModal ? (
							<S.ReactComponents.IconComponent
								autoMirror={false}
								viewBox="0 0 16 16"
								aria-label={S.Locale.get("close")}
								dangerouslySetInnerHTML={{
									__html:
										"<path d='M2.47 2.47a.75.75 0 0 1 1.06 0L8 6.94l4.47-4.47a.75.75 0 1 1 1.06 1.06L9.06 8l4.47 4.47a.75.75 0 1 1-1.06 1.06L8 9.06l-4.47 4.47a.75.75 0 0 1-1.06-1.06L6.94 8 2.47 3.53a.75.75 0 0 1 0-1.06Z'/>",
								}}
							/>
						) : (
							<svg width={18} height={18} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
								<title>{S.Locale.get("close")}</title>
								<path
									d="M31.098 29.794L16.955 15.65 31.097 1.51 29.683.093 15.54 14.237 1.4.094-.016 1.508 14.126 15.65-.016 29.795l1.414 1.414L15.54 17.065l14.144 14.143"
									fill="white"
									fillRule="evenodd"
								/>
							</svg>
						)}
					</button>
				</div>
				<div className={isEmbedWidgetGeneratorOrTrackCreditsModal ? "main-embedWidgetGenerator-content" : "main-trackCreditsModal-mainSection"}>
					{children}
				</div>
			</S.ReactComponents.GenericModal>
		);
	};
	ref = S.React.createElement(PopupModal);
	RootRegistry.register(ref, _.stubTrue);
}

export function hide() {
	close?.();
	ref && RootRegistry.unregister(ref);
}
