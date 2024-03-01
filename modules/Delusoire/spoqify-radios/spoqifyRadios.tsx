import { _ } from "/modules/Delusoire/std/deps.js";
import { SpotifyLoc } from "/modules/Delusoire/delulib/util.js";

import { CONFIG } from "./settings.js";
import { S, SVGIcons, createRegistrar, createSettings } from "/modules/Delusoire/std/index.js";
import { useMenuItem } from "/modules/Delusoire/std/registers/menu.js";
import { createIconComponent } from "/modules/Delusoire/std/api/createIconComponent.js";

const { URI } = S;
const History = S.Platform.getHistory();
const RootlistAPI = S.Platform.getRootlistAPI();

export const createAnonRadio = (uri: string) => {
	const sse = new EventSource(`https://open.spoqify.com/anonymize?url=${uri.substring(8)}`);
	sse.addEventListener("done", e => {
		sse.close();
		const anonUri = URI.fromString(e.data);

		History.push(anonUri.toURLPath(true));
		RootlistAPI.add([anonUri.toURI()], SpotifyLoc.after.fromUri(CONFIG.anonymizedRadiosFolderUri));
	});
};

export const FolderPickerMenuItem = () => {
	const { props } = useMenuItem();
	const { uri } = props.reference;
	return (
		<S.ReactComponents.MenuItem
			disabled={false}
			onClick={() => {
				CONFIG.anonymizedRadiosFolderUri = uri;
			}}
			leadingIcon={createIconComponent({
				icon: SVGIcons["playlist-folder"],
			})}
		>
			Choose for Anonymized Radios
		</S.ReactComponents.MenuItem>
	);
};
