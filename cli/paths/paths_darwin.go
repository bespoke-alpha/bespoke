//go:build darwin

/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package paths

import (
	"path/filepath"
)

func GetPlatformDefaultSpotifyPath() string {
	return "/Applications/Spotify.app/Contents/Resources"
}

func GetSpotifyExecPath(spotifyPath string) string {
	return filepath.Join(spotifyPath, "spotify.exe")
}
