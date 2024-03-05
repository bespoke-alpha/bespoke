/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/module"
	"log"
	"strings"

	"github.com/spf13/cobra"
)

var protocolCmd = &cobra.Command{
	Use:   "protocol [uri]",
	Short: "Internal protocol handler",
	Run: func(cmd *cobra.Command, args []string) {
		arguments := strings.Split(args[0], ":")
		bespoke := arguments[0]
		if bespoke != "bespoke" {
			log.Fatalln("Unsupported URI!")
		}
		action := arguments[1]
		var err error
		switch action {
		case "add":
			metadataURL := arguments[2]
			err = module.AddModuleMURL(metadataURL)
			break

		case "remove":
			identifier := arguments[2]
			err = module.RemoveModule(identifier)
			break

		case "enable":
			identifier := arguments[2]
			err = module.EnableModule(identifier)
			break

		case "disable":
			identifier := arguments[2]
			err = module.DisableModule(identifier)
			break

		}
		if err != nil {
			log.Fatalln(err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(protocolCmd)
}
