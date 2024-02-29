import { S } from "/modules/std/index.js";
const RootlistAPI = S.Platform.getRootlistAPI();
const PlaylistAPI = S.Platform.getPlaylistAPI();
async function createPlaylist({ name, tracks }) {
    try {
        const playlistUri = await RootlistAPI.createPlaylist(name, { before: "start" });
        await PlaylistAPI.add(playlistUri, tracks, { before: "start" });
    }
    catch (error) {
        console.error(error);
        S.Snackbar.enqueueSnackbar("Failed to create playlist", { variant: "error" });
    }
}
function CreatePlaylistButton(props) {
    const { Tooltip, ButtonSecondary } = S.ReactComponents;
    return (S.React.createElement(Tooltip, { label: "Turn Into Playlist", renderInline: true, placement: "top" },
        S.React.createElement(ButtonSecondary, { "aria-label": "Turn Into Playlist", children: "Turn Into Playlist", semanticColor: "textBase", buttonSize: "sm", onClick: () => createPlaylist(props), className: "stats-make-playlist-button" })));
}
export default CreatePlaylistButton;
