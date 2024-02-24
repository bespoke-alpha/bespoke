import { S } from "../std/index.js";
import { _ } from "/hooks/deps.js";
import { onTrackListMutationListeners } from "../delulib/listeners.js";
import { PlaylistItems } from "../grey-duplicates/listeners.js";
import { createIconComponent } from "../std/api/createIconComponent.js";
import { useLiveQuery } from "https://esm.sh/dexie-react-hooks";
import { db } from "../grey-duplicates/db.js";

const { ReactDOM, URI } = S;

onTrackListMutationListeners.push(async (tracklist, tracks) => {
	tracks.map(async (track, i) => {
		if (track.querySelector(".playlist-label-container")) return;
		const lastColumn = track.querySelector(".main-trackList-rowSectionEnd");
		const labelContainer = document.createElement("div");
		labelContainer.classList.add("playlist-label-container");

		const { uri } = track.props;

		ReactDOM.render(<PlaylistLabels uri={uri} />, labelContainer);

		lastColumn.insertBefore(labelContainer, lastColumn.firstChild);
	});
});

const PlaylistLabels = ({ uri }) => {
	const playlists = PlaylistItems.get(uri);
	return Array.from(playlists.keys()).map(playlist => <PlaylistLabel uri={uri} playlistUri={playlist} />);
};

const PlaylistLabel = ({ uri, playlistUri }) => {
	const { metadata } = useLiveQuery(() => {
		return db.playlists.get(playlistUri);
	}, [playlistUri]);

	const name = metadata.name;
	const image = metadata.images[0]?.url ?? "";

	return (
		<S.ReactComponents.Tooltip label={name} placement="top">
			<div>
				<S.ReactComponents.RightClickMenu
					placement="bottom-end"
					menu={
						<S.ReactComponents.Menu>
							<S.ReactComponents.MenuItem
								leadingIcon={createIconComponent({
									icon: '<path d="M5.25 3v-.917C5.25.933 6.183 0 7.333 0h1.334c1.15 0 2.083.933 2.083 2.083V3h4.75v1.5h-.972l-1.257 9.544A2.25 2.25 0 0 1 11.041 16H4.96a2.25 2.25 0 0 1-2.23-1.956L1.472 4.5H.5V3h4.75zm1.5-.917V3h2.5v-.917a.583.583 0 0 0-.583-.583H7.333a.583.583 0 0 0-.583.583zM2.986 4.5l1.23 9.348a.75.75 0 0 0 .744.652h6.08a.75.75 0 0 0 .744-.652L13.015 4.5H2.985z"></path>',
								})}
								onClick={(e: MouseEvent) => {
									e.stopPropagation();
									// TODO: handle removal
								}}
							>
								Remove from {name}
							</S.ReactComponents.MenuItem>
						</S.ReactComponents.Menu>
					}
				>
					<div
						style={{
							cursor: "pointer",
						}}
						onClick={(e: Event) => {
							e.stopPropagation();
							const pathname = URI.fromString(uri)?.toURLPath(true);
							pathname &&
								S.Platform.History.push({
									pathname,
									search: `?uri=${uri}`,
								});
						}}
					>
						<img src={image} />
					</div>
				</S.ReactComponents.RightClickMenu>
			</div>
		</S.ReactComponents.Tooltip>
	);
};
