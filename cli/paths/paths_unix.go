//go:build unix

/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package paths

import (
	"path/filepath"
)

func GetPlatformDefaultSpotifyPath() string {
	return "/opt/spotify/" // aur
}

func GetSpotifyExecPath(spotifyPath string) string {
	return filepath.Join(spotifyPath, "spotify")
}
