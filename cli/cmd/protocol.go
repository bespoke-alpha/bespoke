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
		case "install":
			metadataURL := arguments[2]
			err = module.InstallModuleMURL(metadataURL)
			break

		case "delete":
			identifier := arguments[2]
			err = module.DeleteModule(identifier)
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
