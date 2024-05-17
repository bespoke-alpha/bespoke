/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/uri"
	"log"

	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Perform one-time bespoke initization",
	Long:  "required to be ran at least once per installation",
	Run: func(cmd *cobra.Command, args []string) {
		if err := execInit(); err != nil {
			log.Println("Error occurred! error:")
			log.Panicln(err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
}

func execInit() error {
	if err := uri.RegisterURIScheme(); err != nil {
		log.Println(err.Error())
	}

	return nil
}
