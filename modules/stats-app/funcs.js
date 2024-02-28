import { SPOTIFY } from "./endpoints.js";
import { PLACEHOLDER } from "./constants.js";
import { storage } from "./index.js";
import { S } from "/modules/std/index.js";
import { logger } from "./index.js";
export function filter(str) {
    const normalizedStr = str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    return normalizedStr.replace(/[^a-zA-Z0-9\-._~:/?#[\]@!$&()*+,;= ]/g, "").replace(/ /g, "+");
}
export const updatePageCache = (i, callback, activeOption, lib = false) => {
    const cacheInfo = storage.getItem("cache-info");
    if (!cacheInfo)
        return;
    const cacheInfoArray = JSON.parse(cacheInfo);
    if (!cacheInfoArray[i]) {
        if (!lib) {
            for (const option of ["short_term", "medium_term", "long_term"]) {
                if (option !== activeOption) {
                    callback(option, true, false);
                }
            }
        }
        if (lib === "charts") {
            for (const option of ["artists", "tracks"]) {
                if (option !== activeOption) {
                    callback(option, true, false);
                }
            }
        }
        callback(activeOption, true);
        cacheInfoArray[i] = true;
        storage.setItem("cache-info", JSON.stringify(cacheInfoArray));
    }
};
export const apiRequest = async (name, url, timeout = 5, log = true) => {
    try {
        const timeStart = window.performance.now();
        let response;
        if (url.startsWith("sp")) {
            response = await S.Cosmos.get(url.toString());
        }
        else {
            response = await S.Platform.getRequestBuilder().build().withHost(url).withoutMarket().send();
        }
        if (log)
            console.log(name, "fetch time:", window.performance.now() - timeStart);
        return response.body;
    }
    catch (e) {
        if (timeout === 0) {
            console.log(name, "all requests failed:", e);
            console.log(name, "giving up");
            return null;
        }
        if (timeout === 5) {
            logger.log(name, "request failed:", e);
            logger.log(name, "retrying...");
        }
        await new Promise(resolve => setTimeout(resolve, 5000));
        return apiRequest(name, url, timeout - 1);
    }
};
export const fetchAudioFeatures = async (ids) => {
    const batchSize = 100;
    const batches = [];
    ids = ids.filter(id => id.match(/^[a-zA-Z0-9]{22}$/));
    // Split ids into batches of batchSize
    for (let i = 0; i < ids.length; i += batchSize) {
        const batch = ids.slice(i, i + batchSize);
        batches.push(batch);
    }
    // Send multiple simultaneous requests using Promise.all()
    const promises = batches.map((batch, index) => {
        return apiRequest(`audioFeaturesBatch${index}`, SPOTIFY.audiofeatures(batch.join(",")), 5, false);
    });
    const responses = await Promise.all(promises);
    // Merge responses from all batches into a single array
    const data = responses.reduce((acc, response) => {
        if (!response?.audio_features)
            return acc; // Skip if response is empty
        return acc.concat(response.audio_features);
    }, []);
    return data;
};
export const fetchTopAlbums = async (albums, cachedAlbums) => {
    const album_keys = Object.keys(albums)
        .filter(id => id.match(/^[a-zA-Z0-9]{22}$/))
        .sort((a, b) => albums[b] - albums[a])
        .slice(0, 100);
    const release_years = {};
    let total_album_tracks = 0;
    const cachedAlbumsSet = new Set(cachedAlbums?.map(album => album.uri));
    let top_albums = await Promise.all(album_keys.map(async (albumID) => {
        let albumMeta;
        // loop through and see if the album is already cached
        if (cachedAlbums && cachedAlbumsSet.has(`spotify:album:${albumID}`)) {
            albumMeta = cachedAlbums.find(album => album.uri === `spotify:album:${albumID}`);
        }
        if (!albumMeta) {
            try {
                albumMeta = await S.Platform.getGraphQLLoader()(S.GraphQLDefinitions.getAlbum, {
                    uri: `spotify:album:${albumID}`,
                    locale: "en",
                    offset: 0,
                    limit: 50,
                });
                if (!albumMeta?.data?.albumUnion?.name)
                    throw new Error("Invalid URI");
            }
            catch (e) {
                console.error("stats - album metadata request failed:", e);
                return;
            }
        }
        const releaseYear = albumMeta?.release_year || albumMeta.data.albumUnion.date.isoString.slice(0, 4);
        release_years[releaseYear] = (release_years[releaseYear] || 0) + albums[albumID];
        total_album_tracks += albums[albumID];
        return {
            name: albumMeta.name || albumMeta.data.albumUnion.name,
            uri: albumMeta.uri || albumMeta.data.albumUnion.uri,
            image: albumMeta.image || albumMeta.data.albumUnion.coverArt.sources[0]?.url || PLACEHOLDER,
            release_year: releaseYear,
            freq: albums[albumID],
        };
    }));
    top_albums = top_albums.filter(el => el != null).slice(0, 10);
    return [top_albums, Object.entries(release_years), total_album_tracks];
};
export const fetchTopArtists = async (artists) => {
    if (Object.keys(artists).length === 0)
        return [[], [], 0];
    const artist_keys = Object.keys(artists)
        .filter(id => id.match(/^[a-zA-Z0-9]{22}$/))
        .sort((a, b) => artists[b] - artists[a])
        .slice(0, 50);
    const genres = {};
    let total_genre_tracks = 0;
    const artistsMeta = await apiRequest("artistsMetadata", SPOTIFY.artists(artist_keys.join(",")));
    let top_artists = artistsMeta?.artists?.map((artist) => {
        if (!artist)
            return null;
        for (const genre of artist.genres) {
            genres[genre] = (genres[genre] || 0) + artists[artist.id];
        }
        total_genre_tracks += artists[artist.id];
        return {
            name: artist.name,
            uri: artist.uri,
            image: artist.images[2]?.url || PLACEHOLDER,
            freq: artists[artist.id],
        };
    });
    top_artists = top_artists.filter(el => el != null).slice(0, 10);
    const top_genres = Object.entries(genres)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 10);
    return [top_artists, top_genres, total_genre_tracks];
};
export const convertTrackData = async (data) => {
    return await Promise.all(data.map(async (item) => {
        const res = await S.Platform.getRequestBuilder().build().withHost(SPOTIFY.search(item.name, item.artist.name)).withoutMarket().send();
        const spotifyItem = res.body.tracks?.items[0];
        if (!spotifyItem) {
            console.log(`couldn't find track: ${item.name} by ${item.artist.name}`);
            return {
                name: item.name,
                image: PLACEHOLDER,
                uri: item.url,
                artists: [{ name: item.artist.name, uri: item.artist.url }],
                duration: 0,
                album: "N/A",
                popularity: 0,
                explicit: false,
                album_uri: item.url,
            };
        }
        return {
            name: item.name,
            image: spotifyItem.album.images[0].url,
            uri: spotifyItem.uri,
            id: spotifyItem.id,
            artists: spotifyItem.artists.map((artist) => ({ name: artist.name, uri: artist.uri })),
            duration: spotifyItem.duration_ms,
            album: spotifyItem.album.name,
            popularity: spotifyItem.popularity,
            explicit: spotifyItem.explicit,
            album_uri: spotifyItem.album.uri,
            release_year: spotifyItem.album.release_date.slice(0, 4),
        };
    }));
};
export const convertAlbumData = async (data) => {
    return await Promise.all(data.map(async (item) => {
        const res = await S.Platform.getRequestBuilder().build().withHost(SPOTIFY.searchalbum(item.name, item.artist.name)).withoutMarket().send();
        const spotifyItem = res.body.albums?.items[0];
        if (!spotifyItem) {
            console.log(`couldn't find album: ${item.name} by ${item.artist.name}`);
            return {
                name: item.name,
                image: PLACEHOLDER,
                uri: item.url,
                id: item.mbid,
            };
        }
        return {
            name: item.name,
            image: spotifyItem.images[0].url,
            uri: spotifyItem.uri,
            id: spotifyItem.id,
        };
    }));
};
export const convertArtistData = async (data) => {
    return await Promise.all(data.map(async (item) => {
        const res = await S.Platform.getRequestBuilder().build().withHost(SPOTIFY.searchartist(item.name)).withoutMarket().send();
        const spotifyItem = res.body.artists?.items[0];
        if (!spotifyItem) {
            console.log(`couldn't find artist: ${item.name}`);
            return {
                name: item.name,
                image: PLACEHOLDER,
                uri: item.url,
                id: item.mbid,
            };
        }
        return {
            name: item.name,
            image: spotifyItem.images[0].url,
            uri: spotifyItem.uri,
            id: spotifyItem.id,
            genres: spotifyItem.genres,
        };
    }));
};
export const checkLiked = async (tracks) => {
    const nullIndexes = [];
    tracks.forEach((track, index) => {
        if (track === null) {
            nullIndexes.push(index);
        }
    });
    const apiResponse = await apiRequest("checkLiked", SPOTIFY.queryliked(tracks.filter(Boolean).join(",")));
    if (!apiResponse)
        return;
    const response = [];
    let nullIndexesIndex = 0;
    for (let i = 0; i < tracks.length; i++) {
        if (nullIndexes.includes(i)) {
            // Insert false value at the original position of null
            response.push(false);
        }
        else {
            // Copy the value from the API response
            response.push(apiResponse[nullIndexesIndex]);
            nullIndexesIndex++;
        }
    }
    return response;
};
