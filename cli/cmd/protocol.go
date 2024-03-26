/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/module"
	"errors"
	"log"
	"regexp"

	e "bespoke/errors"

	"github.com/spf13/cobra"
)

var protocolCmd = &cobra.Command{
	Use:   "protocol [uri]",
	Short: "Internal protocol handler",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, args []string) {
		if err := HandleProtocol(args[0]); err != nil {
			log.Panicln(err.Error())
		}
	},
}

func HandleProtocol(message string) error {
	re := regexp.MustCompile(`bespoke:(?<action>[^:]+)(:(?<args>.*))?`)
	submatches := re.FindStringSubmatch(message)
	if len(submatches) == 0 {
		return errors.New("malformed uri")
	}
	action := submatches[1]
	arguments := submatches[3]
	switch action {
	case "add":
		metadataURL := arguments
		return module.AddModuleMURL(metadataURL)

	case "remove":
		identifier := arguments
		return module.RemoveModule(identifier)

	case "enable":
		identifier := arguments
		return module.ToggleModuleInVault(identifier, true)

	case "disable":
		identifier := arguments
		return module.ToggleModuleInVault(identifier, false)
	}
	return e.ErrUnsupportedOperation
}

func init() {
	rootCmd.AddCommand(protocolCmd)
}
