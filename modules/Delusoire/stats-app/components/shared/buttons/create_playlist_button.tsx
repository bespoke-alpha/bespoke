import { S } from "/modules/Delusoirestd/index.js";

export interface CreatePlaylistButtonProps {
	name: string;
	tracks: string[];
}

const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();

async function createPlaylist({ name, tracks }: CreatePlaylistButtonProps): Promise<void> {
	try {
		const playlistUri = await RootlistAPI.createPlaylist(name, { before: "start" });
		await PlaylistAPI.add(playlistUri, tracks, { before: "start" });
	} catch (error) {
		console.error(error);
		S.Snackbar.enqueueSnackbar("Failed to create playlist", { variant: "error" });
	}
}

function CreatePlaylistButton(props: CreatePlaylistButtonProps): React.ReactElement<HTMLButtonElement> {
	const { Tooltip, ButtonSecondary } = S.ReactComponents;

	return (
		<Tooltip label={"Turn Into Playlist"} renderInline={true} placement="top">
			<ButtonSecondary
				aria-label="Turn Into Playlist"
				children="Turn Into Playlist"
				semanticColor="textBase"
				buttonSize="sm"
				onClick={() => createPlaylist(props)}
				className="stats-make-playlist-button"
			/>
		</Tooltip>
	);
}

export default CreatePlaylistButton;
