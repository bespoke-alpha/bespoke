//go:build windows

/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package paths

import (
	"path/filepath"

	"github.com/adrg/xdg"
)

func GetPlatformDefaultSpotifyPath() string {
	return filepath.Join(xdg.DataDirs[0], "Spotify")
}

func GetSpotifyExecPath(spotifyPath string) string {
	return filepath.Join(spotifyPath, "spotify.exe")
}

func GetSpotifyConfigPath() string {
	return filepath.Join(xdg.ConfigHome, "Spotify")
}
