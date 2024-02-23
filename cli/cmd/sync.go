/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/paths"
	"log"
	"os"

	"github.com/go-git/go-git/v5"
	"github.com/spf13/cobra"
)

var syncCmd = &cobra.Command{
	Use:   "sync",
	Short: "Pull latest bespoke version from github",
	Run: func(cmd *cobra.Command, args []string) {
		execSync()
	},
}

func execSync() {
	log.Println("Opening bespoke local repo at", paths.ConfigPath)
	if rep, err := git.PlainOpen(paths.ConfigPath); err != nil {
		log.Println("Cloning remote bespoke repo to", paths.ConfigPath)
		_, err = git.PlainClone(paths.ConfigPath, false, &git.CloneOptions{
			URL:      "https://github.com/Delusoire/bespoke",
			Progress: os.Stdout,
			Depth:    1,
		})
		if err != nil {
			log.Fatalln(err.Error())
		}
	} else {
		w, err := rep.Worktree()
		if err != nil {
			log.Fatalln(err.Error())
		}

		log.Println("Pulling remote bespoke repo in", paths.ConfigPath)
		err = w.Pull(&git.PullOptions{RemoteName: "origin"})
		if err != nil {
			log.Fatalln(err.Error())
		}
	}
}

func init() {
	rootCmd.AddCommand(syncCmd)
}
