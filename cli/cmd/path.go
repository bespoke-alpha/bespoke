/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/paths"
	"log"

	"github.com/spf13/cobra"
)

var (
	showSpotiy bool
	showConfig bool
)

var pathCmd = &cobra.Command{
	Use:   "path",
	Short: "Print bespoke paths",
	Run: func(cmd *cobra.Command, args []string) {
		if !showSpotiy && !showConfig {
			showSpotiy = true
			showConfig = true
		}
		if showSpotiy {
			log.Println("Spotify:", spotifyDataPath)
		}
		if showConfig {
			log.Println("config:", paths.ConfigPath)
		}
	},
}

func init() {
	rootCmd.AddCommand(pathCmd)

	pathCmd.Flags().BoolVar(&showSpotiy, "spotify", false, "show Spotify path")
	pathCmd.Flags().BoolVar(&showConfig, "config", false, "show config path")
}
