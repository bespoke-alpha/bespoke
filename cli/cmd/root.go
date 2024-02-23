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

	"github.com/go-git/go-git/v5"

	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	mirror          bool
	spotifyDataPath string
	cfgFile         string
)

var rootCmd = &cobra.Command{
	Use:   "bespoke",
	Short: "Make Spotify your own",
	Long:  `Bespoke is a CLI utility that empowers Spotify with custom themes and extensions`,
	Run: func(cmd *cobra.Command, args []string) {
		if rep, err := git.PlainOpen(paths.ConfigPath); err != nil {
			_, err = git.PlainClone(paths.ConfigPath, false, &git.CloneOptions{
				URL:      "https://github.com/Delusoire/bespoke",
				Progress: os.Stdout,
			})
			if err != nil {
				log.Fatalln(err.Error())
			}
		} else {
			w, err := rep.Worktree()
			if err != nil {
				log.Fatalln(err.Error())
			}

			err = w.Pull(&git.PullOptions{RemoteName: "origin"})
			if err != nil {
				log.Fatalln(err.Error())
			}
		}

		// Are we run as spotify?
		execPath, err := os.Executable()
		if err != nil {
			log.Fatalln(err.Error())
		}
		execName := strings.ToLower(filepath.Base(execPath))
		if strings.HasPrefix(execName, "spotify") {
			runRunCmd(args)
			os.Exit(0)
		}
	},
}

func Execute() {
	err := rootCmd.Execute()
	if err != nil {
		os.Exit(1)
	}
}

func init() {
	cobra.OnInitialize(initConfig)

	rootCmd.PersistentFlags().BoolVarP(&mirror, "mirror", "m", false, "Mirror Spotify files instead of patching them directly")
	rootCmd.PersistentFlags().StringVar(&spotifyDataPath, "spotify-data", paths.GetSpotifyPath(), "Override Spotify data folder (containing the spotify executable)")
	rootCmd.PersistentFlags().StringVar(&spotifyConfigPath, "spotify-config", paths.GetSpotifyConfigPath(), "Override Spotify config folder (containing prefs & offline.bnk)")
	rootCmd.PersistentFlags().StringVar(&cfgFile, "config", "", "config file (default is $XDG_CONFIG_HOME/bespoke/config.yaml)")
}

func initConfig() {
	if cfgFile != "" {
		viper.SetConfigFile(cfgFile)
	} else {
		viper.AddConfigPath(paths.ConfigPath)
		viper.SetConfigType("yaml")
		viper.SetConfigName("config")
	}

	viper.AutomaticEnv()

	if err := viper.ReadInConfig(); err == nil {
		fmt.Fprintln(os.Stderr, "Using config file:", viper.ConfigFileUsed())
	}
}
