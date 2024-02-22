//go:build unix

package paths

import (
	"path/filepath"
)

func GetPlatformDefaultSpotifyPath() string {
	return "/opt/spotify/"
}

func GetSpotifyExecPath(spotifyPath string) string {
	return filepath.Join(spotifyPath, "spotify")
}
