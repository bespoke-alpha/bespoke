import { S } from "/modules/std/index.js";
import type { InfoToCreatePlaylist } from "../../types/stats_types.js";

interface CreatePlaylistButtonProps {
	infoToCreatePlaylist: InfoToCreatePlaylist;
}

const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();

async function createPlaylistAsync(infoToCreatePlaylist: InfoToCreatePlaylist): Promise<void> {
	try {
		const { playlistName, itemsUris } = infoToCreatePlaylist;
		const playlistUri = await RootlistAPI.createPlaylist(playlistName, { before: "start" });
		await PlaylistAPI.add(playlistUri, itemsUris, { before: "start" });
	} catch (error) {
		console.error(error);
		S.Snackbar.enqueueSnackbar("Failed to create playlist", { variant: "error" });
	}
}

function CreatePlaylistButton(props: CreatePlaylistButtonProps): React.ReactElement<HTMLButtonElement> {
	const { Tooltip, ButtonSecondary } = S.ReactComponents;
	const { infoToCreatePlaylist } = props;

	return (
		<Tooltip label={"Turn Into Playlist"} renderInline={true} placement="top">
			<ButtonSecondary
				aria-label="Turn Into Playlist"
				children="Turn Into Playlist"
				semanticColor="textBase"
				buttonSize="sm"
				onClick={() => createPlaylistAsync(infoToCreatePlaylist)}
				className="stats-make-playlist-button"
			/>
		</Tooltip>
	);
}

export default CreatePlaylistButton;
