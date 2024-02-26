import { fetchAlbum } from "../delulib/GraphQL/fetchAlbum.js";
import { fetchArtistDiscography } from "../delulib/GraphQL/fetchArtistDiscography.js";
import { fetchArtistOverview } from "../delulib/GraphQL/fetchArtistOveriew.js";
import { _, fp } from "../std/deps.js";
import { pMchain } from "../delulib/fp.js";
import { parseAlbumTrack, parseArtistLikedTrack, parseLibraryAPILikedTracks, parsePlaylistAPITrack, parseTopTrackFromArtist, } from "../delulib/parse.js";
import { fetchArtistLikedTracks, fetchLikedTracks, fetchPlaylistContents } from "../delulib/platformApi.js";
import { CONFIG } from "./settings.js";
import { S } from "../std/index.js";
const { URI } = S;
export const getTracksFromAlbum = async (uri) => {
    const albumRes = await fetchAlbum(uri);
    const releaseDate = new Date(albumRes.date.isoString).getTime();
    const filler = {
        albumUri: albumRes.uri,
        albumName: albumRes.name,
        releaseDate,
    };
    return Promise.all(albumRes.tracks.items.map(async (track) => {
        const parsedTrack = await parseAlbumTrack(track);
        return Object.assign(parsedTrack, filler);
    }));
};
export const getLikedTracks = _.flow(fetchLikedTracks, pMchain(fp.map(parseLibraryAPILikedTracks)));
export const getTracksFromPlaylist = _.flow(fetchPlaylistContents, pMchain(fp.map(parsePlaylistAPITrack)), pMchain(fp.filter(track => !URI.is.LocalTrack(track.uri))));
export const getTracksFromArtist = async (uri) => {
    const allTracks = new Array();
    const itemsWithCountAr = new Array();
    const itemsReleasesAr = new Array();
    const appearsOnAr = new Array();
    if (CONFIG.artistAllDiscography) {
        const items = await fetchArtistDiscography(uri);
        itemsReleasesAr.push({ items, totalCount: Infinity });
    }
    else {
        const { discography, relatedContent } = await fetchArtistOverview(uri);
        CONFIG.artistLikedTracks && allTracks.push(...(await fetchArtistLikedTracks(uri)).map(parseArtistLikedTrack));
        CONFIG.artistTopTracks && allTracks.push(...discography.topTracks.items.map(parseTopTrackFromArtist));
        CONFIG.artistPopularReleases && itemsWithCountAr.push(discography.popularReleasesAlbums);
        CONFIG.artistSingles && itemsReleasesAr.push(discography.singles);
        CONFIG.artistAlbums && itemsReleasesAr.push(discography.albums);
        CONFIG.artistCompilations && itemsReleasesAr.push(discography.compilations);
        CONFIG.artistAppearsOn && appearsOnAr.push(relatedContent.appearsOn);
    }
    const items1 = itemsWithCountAr.flatMap(iwc => iwc.items);
    const items2 = itemsReleasesAr.flatMap(ir => ir.items.flatMap(i => i.releases.items));
    const albumLikeUris = items1.concat(items2).map(item => item.uri);
    const albumsTracks = await Promise.all(albumLikeUris.map(getTracksFromAlbum));
    const appearsOnUris = appearsOnAr.flatMap(ir => ir.items.flatMap(i => i.releases.items)).map(item => item.uri);
    const appearsOnTracks = await Promise.all(appearsOnUris.map(getTracksFromAlbum));
    allTracks.push(...albumsTracks.flat(), ...appearsOnTracks.flat().filter(track => track.artistUris.includes(uri)));
    return await Promise.all(allTracks);
};
