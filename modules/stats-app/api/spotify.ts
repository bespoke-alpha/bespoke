export const SpotifyTimerange = {
	Short: "short_term",
	Medium: "medium_term",
	Long: "long_term",
} as const;

const WEB_API_URL = "https://api.spotify.com";
const SPCLIENT_WG_URL = "https://spclient.wg.spotify.com";
const EXP_WG_ENDPOINT = "https://exp.wg.spotify.com";
const ACCOUNTS_HOST = "https://accountes.spotify.com";
const PARTNER_API_ENDPOINT = "https://api-partner.spotify.com";

export const Hosts = {
	WEB_API_URL,
	SPCLIENT_WG_URL,
	EXP_WG_ENDPOINT,
	ACCOUNTS_HOST,
	PARTNER_API_ENDPOINT,
};

export const Endpoints = {
	/**
	 * @deprecated Use spotifyApi from delulib instead
	 */
	web: `${WEB_API_URL}/v1` as const,
	pathfinder: `${PARTNER_API_ENDPOINT}/pathfinder/v1`,
};
