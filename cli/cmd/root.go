/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"bespoke/paths"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	autoUpdate bool

	mirror            bool
	spotifyDataPath   string
	spotifyConfigPath string
	cfgFile           string
)

var rootCmd = &cobra.Command{
	Use:   "bespoke",
	Short: "Make Spotify your own",
	Long:  `Bespoke is a CLI utility that empowers the desktop Spotify client with custom themes and extensions`,
	Run: func(cmd *cobra.Command, args []string) {
		if _, err := os.Stat(paths.ConfigPath); err != nil || autoUpdate {
			execSync()
		}
		execInit()
		if isRanAsSpotify() {
			execRun(args)
		}
	},
}

func isRanAsSpotify() bool {
	execPath, err := os.Executable()
	if err != nil {
		log.Fatalln(err.Error())
	}
	execName := strings.ToLower(filepath.Base(execPath))
	return strings.HasPrefix(strings.ToLower(execName), "spotify")
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.Flags().BoolVar(&autoUpdate, "auto-update", false, "Toggle auto updates for bespoke")

	rootCmd.PersistentFlags().BoolVarP(&mirror, "mirror", "m", false, "Mirror Spotify files instead of patching them directly")
	rootCmd.PersistentFlags().StringVar(&spotifyDataPath, "spotify-data", paths.GetSpotifyPath(), "Override Spotify data folder (containing the spotify executable)")
	rootCmd.PersistentFlags().StringVar(&spotifyConfigPath, "spotify-config", paths.GetSpotifyConfigPath(), "Override Spotify config folder (containing prefs & offline.bnk)")
	viper.BindPFlag("mirror", rootCmd.PersistentFlags().Lookup("mirror"))
	viper.BindPFlag("spotify-data", rootCmd.PersistentFlags().Lookup("spotify-data"))
	viper.BindPFlag("spotify-config", rootCmd.PersistentFlags().Lookup("spotify-config"))

	defaultcfgFile := filepath.Join(paths.ConfigPath, "config.yaml")

	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", defaultcfgFile, "config file (default is "+defaultcfgFile+")")
}

func initConfig() {
	viper.SetConfigFile(cfgFile)
	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
		mirror = viper.GetBool("mirror")
		spotifyDataPath = viper.GetString("spotify-data")
		spotifyConfigPath = viper.GetString("spotify-config")
	}
}
