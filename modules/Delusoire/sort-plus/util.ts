import { _, fp } from "/modules/Delusoire/std/deps.js";
import { S } from "/modules/Delusoire/std/index.js";
import { spotifyApi } from "/modules/Delusoire/delulib/api.js";
import type { TrackData } from "/modules/Delusoire/delulib/parse.js";

import type { URIClass } from "/modules/Delusoire/std/expose/webpack.js";

const { URI } = S;

export const SEPARATOR_URI = "spotify:separator";

export enum ERROR {
	LAST_SORTED_QUEUE_EMPTY = "Must sort to queue beforehand",
	LAST_SORTED_QUEUE_NOT_A_PLAYLIST = "Last sorted queue must be a playlist",
}

export type AsyncTracksOperation = (tracks: TrackData[]) => Promise<TrackData[]> | TrackData[];

export enum SortAction {
	SPOTIFY_PLAYCOUNT = "Spotify - Play Count",
	SPOTIFY_POPULARITY = "Spotify - Popularity",
	SPOTIFY_RELEASEDATE = "Spotify - Release Date",
	LASTFM_SCROBBLES = "LastFM - Scrobbles",
	LASTFM_PERSONALSCROBBLES = "LastFM - My Scrobbles",
	LASTFM_PLAYCOUNT = "LastFM - Play Count",
}

export enum SortActionIcon {
	"Spotify - Play Count" = "play",
	"Spotify - Popularity" = "heart",
	"Spotify - Release Date" = "list-view",
	"LastFM - Scrobbles" = "volume",
	"LastFM - My Scrobbles" = "artist",
	"LastFM - Play Count" = "subtitles",
}

export enum SortActionProp {
	"Spotify - Play Count" = "playcount",
	"Spotify - Popularity" = "popularity",
	"Spotify - Release Date" = "releaseDate",
	"LastFM - Scrobbles" = "scrobbles",
	"LastFM - My Scrobbles" = "personalScrobbles",
	"LastFM - Play Count" = "lastfmPlaycount",
}

export const joinByUri = (...trackss: TrackData[][]) =>
	_(trackss)
		.flatten()
		.map(fp.omitBy(_.isNil)<TrackData>)
		.groupBy("uri")
		.mapValues(sameUriTracks => Object.assign({}, ...sameUriTracks) as TrackData)
		.values()
		.value();

export const URI_is_LikedTracks = (uri: string) => {
	const uriObj = URI.fromString(uri);
	return uriObj.type === URI.Types.COLLECTION && uriObj.category === "tracks";
};

export const getNameFromUri = async (uri: URIClass<any>) => {
	switch (uri.type) {
		case URI.Types.ALBUM: {
			const album = await spotifyApi.albums.get(uri.id!);
			return album.name;
		}

		case URI.Types.ARTIST: {
			const artist = await spotifyApi.artists.get(uri.id!);
			return artist.name;
		}

		case URI.Types.COLLECTION:
			if (uri.category === "tracks") return "Liked Tracks";
			break;

		case URI.Types.PLAYLIST:
		case URI.Types.PLAYLIST_V2: {
			const playlist = await spotifyApi.playlists.getPlaylist(uri.id!);
			return playlist.name;
		}
	}
};
