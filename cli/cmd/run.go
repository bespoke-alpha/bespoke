/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"os/exec"
	"path/filepath"

	"bespoke/paths"

	"github.com/adrg/xdg"
	"github.com/spf13/cobra"
)

var runCmd = &cobra.Command{
	Use:   "run",
	Short: "launch Spotify with your favorite addons",
	Run: func(cmd *cobra.Command, args []string) {
		execRun(args)
	},
}

func prepend[Type any](slice []Type, elems ...Type) []Type {
	return append(elems, slice...)
}

func execRun(args []string) {
	args = prepend(args, "--disable-web-security")
	var execPath string
	if mirror {
		execPath = filepath.Join(xdg.ConfigHome, "Microsoft", "WindowsApps", "Spotify.exe")
		args = prepend(args, "--app-directory="+filepath.Join(paths.ConfigPath, "apps"))
	} else {
		execPath = paths.GetSpotifyExecPath(spotifyDataPath)
	}
	exec.Command(execPath, args...).Start()
}

func init() {
	rootCmd.AddCommand(runCmd)
}
