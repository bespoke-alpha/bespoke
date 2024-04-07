/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/uri"
	"log"
	"runtime"

	"github.com/spf13/cobra"
	"golang.org/x/sys/windows/registry"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "Perform one-time bespoke initization",
	Long:  "required to be ran at least once per installation",
	Run: func(cmd *cobra.Command, args []string) {
		if err := execInit(); err != nil {
			log.Println("Error occurred! Try running this command (and only this command) in an elevated shell; error:")
			log.Panicln(err.Error())
		}
	},
}

func init() {
	rootCmd.AddCommand(initCmd)
}

func enableDeveloperModeOnWindows() error {
	if runtime.GOOS != "windows" {
		return nil
	}

	access := uint32(registry.QUERY_VALUE | registry.SET_VALUE)
	key := registry.LOCAL_MACHINE

	key, err := registry.OpenKey(key, `Software\Microsoft\Windows\CurrentVersion\AppModelUnlock`, access)
	if err != nil {
		return err
	}

	return key.SetDWordValue("AllowDevelopmentWithoutDevLicense", 1)
}

func execInit() error {
	if err := enableDeveloperModeOnWindows(); err != nil {
		return err
	}

	if err := uri.RegisterURIScheme(); err != nil {
		log.Println(err.Error())
	}

	return nil
}
