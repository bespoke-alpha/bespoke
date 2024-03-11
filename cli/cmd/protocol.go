/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/module"
	"log"
	"regexp"

	"github.com/spf13/cobra"
)

var protocolCmd = &cobra.Command{
	Use:   "protocol [uri]",
	Short: "Internal protocol handler",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		re := regexp.MustCompile(`bespoke:(?<action>[^:]+)(:(?<args>.*))?`)
		submatches := re.FindStringSubmatch(args[0])
		if len(submatches) == 0 {
			log.Fatalln("Unsupported URI")
		}
		action := submatches[1]
		arguments := submatches[3]
		var err error
		switch action {
		case "add":
			metadataURL := arguments
			err = module.AddModuleMURL(metadataURL)

		case "remove":
			identifier := arguments
			err = module.RemoveModule(identifier)

		case "enable":
			identifier := arguments
			err = module.ToggleModule(identifier, true)

		case "disable":
			identifier := arguments
			err = module.ToggleModule(identifier, false)

		}
		if err != nil {
			log.Fatalln(err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(protocolCmd)
}
