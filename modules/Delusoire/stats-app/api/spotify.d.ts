import type { ValueOf } from "../util/types";
export type SpotifyTimeRange = ValueOf<typeof SpotifyTimeRange>;
export declare const SpotifyTimeRange: {
    readonly Short: "short_term";
    readonly Medium: "medium_term";
    readonly Long: "long_term";
};
export declare const Hosts: {
    WEB_API_URL: string;
    SPCLIENT_WG_URL: string;
    EXP_WG_ENDPOINT: string;
    ACCOUNTS_HOST: string;
    PARTNER_API_ENDPOINT: string;
};
export declare const Endpoints: {
    /**
     * @deprecated Use spotifyApi from delulib instead
     */
    web: "https://api.spotify.com/v1";
    pathfinder: string;
};
