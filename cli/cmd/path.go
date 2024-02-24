/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/paths"
	"fmt"

	"github.com/spf13/cobra"
)

var (
	showSpotiyData    bool
	showSpotifyConfig bool
	showConfig        bool
)

var pathCmd = &cobra.Command{
	Use:   "path",
	Short: "Print bespoke paths",
	Run: func(cmd *cobra.Command, args []string) {
		if !showSpotiyData && !showSpotifyConfig && !showConfig {
			showSpotiyData = true
			showSpotifyConfig = true
			showConfig = true
		}
		fmt.Println("mirror:", mirror)
		if showSpotiyData {
			fmt.Println("Spotify data:", spotifyDataPath)
		}
		if showSpotifyConfig {
			fmt.Println("Spotify config:", spotifyConfigPath)
		}
		if showConfig {
			fmt.Println("config:", paths.ConfigPath)
		}
	},
}

func init() {
	rootCmd.AddCommand(pathCmd)

	pathCmd.Flags().BoolVar(&showSpotiyData, "spotify-data", false, "Show Spotify data path")
	pathCmd.Flags().BoolVar(&showSpotiyData, "spotify-config", false, "Show Spotify config path")
	pathCmd.Flags().BoolVar(&showConfig, "config", false, "Show config path")
}
