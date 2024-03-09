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

var (
	modules bool
)

var syncCmd = &cobra.Command{
	Use:   "sync",
	Short: "Update bespoke from GitHub",
	Run: func(cmd *cobra.Command, args []string) {
		execSync()
	},
}

func execSync() {
	if err := pull(paths.ConfigPath); err != nil {
		log.Println("Cloning remote bespoke repo to", paths.ConfigPath)
		_, err = git.PlainClone(paths.ConfigPath, false, &git.CloneOptions{
			URL:      "https://github.com/Delusoire/bespoke",
			Progress: os.Stdout,
			Depth:    1,
		})
		if err != nil {
			log.Fatalln(err.Error())
		}
	}
}

func pull(localRepo string) error {
	log.Println("Opening repo at", localRepo)
	rep, err := git.PlainOpen(localRepo)
	if err != nil {
		return err
	}

	w, err := rep.Worktree()
	if err != nil {
		return err
	}

	log.Println("Pulling from origin in", paths.ConfigPath)
	return w.Pull(&git.PullOptions{RemoteName: "origin"})
}

func init() {
	rootCmd.AddCommand(syncCmd)

	syncCmd.Flags().BoolVar(&modules, "modules", false, "Update modules too")
}
