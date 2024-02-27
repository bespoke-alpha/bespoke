import { _ } from "/modules/std/deps.js";
import { SpotifyLoc } from "/modules/delulib/util.js";

import { CONFIG } from "./settings.js";
import { S, SVGIcons, createRegistrar } from "/modules/std/index.js";
import { useMenuItem } from "/modules/std/registers/menu.js";
import { createIconComponent } from "/modules/std/api/createIconComponent.js";
import type { Module } from "/hooks/module.js";

const { URI } = S;
const History = S.Platform.getHistory();
const RootlistAPI = S.Platform.getRootlistAPI();

const createAnonRadio = (uri: string) => {
	const sse = new EventSource(`https://open.spoqify.com/anonymize?url=${uri.substring(8)}`);
	sse.addEventListener("done", e => {
		sse.close();
		const anonUri = URI.fromString(e.data);

		History.push(anonUri.toURLPath(true));
		RootlistAPI.add([anonUri.toURI()], SpotifyLoc.after.fromUri(CONFIG.anonymizedRadiosFolderUri));
	});
};

export default function (mod: Module) {
	const registrar = createRegistrar(mod);

	registrar.register(
		"menu",
		S.React.createElement(() => {
			const { props } = useMenuItem();
			const uri = props.uri;
			return (
				<S.ReactComponents.MenuItem
					disabled={false}
					onClick={() => {
						createAnonRadio(uri);
					}}
					leadingIcon={createIconComponent({
						icon: SVGIcons.podcasts,
					})}
				>
					Create anonymized radio
				</S.ReactComponents.MenuItem>
			);
		}),
		({ props }) => {
			return _.overSome([URI.is.Album, URI.is.Artist, URI.is.PlaylistV1OrV2, URI.is.Track])(props?.uri);
		},
	);

	registrar.register(
		"menu",
		S.React.createElement(() => {
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
		}),
		({ props }) => {
			return URI.is.Folder(props?.reference?.uri);
		},
	);
}
