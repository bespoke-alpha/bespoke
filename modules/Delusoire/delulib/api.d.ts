export declare const spotifyApi: any;
export declare const fetchWebSoundOfSpotifyPlaylist: (genre: string) => Promise<any>;
export interface fetchLastFMTrackResMinimal {
    track: {
        name: string;
        mbid: string;
        url: string;
        duration: string;
        listeners: string;
        playcount: string;
        artist: {
            name: string;
            mbid: string;
            url: string;
        };
        album: {
            artist: string;
            title: string;
            mbid: string;
            url: string;
        };
        userplaycount: string;
        userloved: string;
        toptags: {
            tag: Array<{
                name: string;
                url: string;
            }>;
        };
        wiki: {
            published: string;
            summary: string;
            content: string;
        };
    };
}
export declare const fetchLastFMTrack: (LFMApiKey: string, artist: string, trackName: string, lastFmUsername?: string) => Promise<{
    name: string;
    mbid: string;
    url: string;
    duration: string;
    listeners: string;
    playcount: string;
    artist: {
        name: string;
        mbid: string;
        url: string;
    };
    album: {
        artist: string;
        title: string;
        mbid: string;
        url: string;
    };
    userplaycount: string;
    userloved: string;
    toptags: {
        tag: Array<{
            name: string;
            url: string;
        }>;
    };
    wiki: {
        published: string;
        summary: string;
        content: string;
    };
}>;
export interface SearchYoutubeResMinimal {
    items: Array<{
        id: {
            videoId: string;
        };
        snippet: {
            publishedAt: string;
            channelId: string;
            title: string;
            description: string;
            channelTitle: string;
            publishTime: string;
        };
    }>;
}
export declare const searchYoutube: (YouTubeApiKey: string, searchString: string) => Promise<SearchYoutubeResMinimal>;
