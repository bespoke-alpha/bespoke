/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"log"
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
		runRunCmd(args)
	},
}

func runRunCmd(args []string) {
	log.Println()
	var execPath string
	if mirror {
		execPath = filepath.Join(xdg.ConfigHome, "Microsoft", "WindowsApps", "Spotify.exe")
		args = append([]string{`--app-directory=` + filepath.Join(paths.ConfigPath, "apps")}, args...)
	} else {
		execPath = paths.GetSpotifyExecPath(spotifyDataPath)
	}
	exec.Command(execPath, args...).Start()
}

func init() {
	rootCmd.AddCommand(runCmd)
}
