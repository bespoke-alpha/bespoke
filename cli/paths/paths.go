package paths

import (
	"os/exec"
	"path/filepath"

	"github.com/adrg/xdg"
)

var (
	ConfigPath = filepath.Join(xdg.ConfigHome, "bespoke")
)

func GetSpotifyPath() string {
	spotifyExecPath, err := exec.LookPath("spotify")
	if err == nil {
		spotifyExecPath, err = filepath.EvalSymlinks(spotifyExecPath)
		if err == nil {
			return filepath.Dir(spotifyExecPath)
		}
	}

	return GetPlatformDefaultSpotifyPath()
}

func GetSpotifyAppsPath(spotifyPath string) string {
	return filepath.Join(spotifyPath, "Apps")
}
