/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bytes"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var (
	spotifyConfigPath string
)

var devCmd = &cobra.Command{
	Use:   "dev",
	Short: "Patch Spotify to open in app-developer mode next time it launches",
	Run: func(cmd *cobra.Command, args []string) {
		offlineBnkPath := filepath.Join(spotifyConfigPath, "offline.bnk")

		file, err := os.OpenFile(offlineBnkPath, os.O_RDWR, 0644)
		if err != nil {
			log.Fatalln(err.Error())
		}
		defer file.Close()

		buf := new(bytes.Buffer)
		buf.ReadFrom(file)
		content := buf.String()
		firstLocation := strings.Index(content, "app-developer")
		firstPatchLocation := int64(firstLocation + 14)

		secondLocation := strings.LastIndex(content, "app-developer")
		secondPatchLocation := int64(secondLocation + 15)

		file.WriteAt([]byte{50}, firstPatchLocation)
		file.WriteAt([]byte{50}, secondPatchLocation)
		fmt.Println("Mode app-developer enabled for next launch")
	},
}

func init() {
	rootCmd.AddCommand(devCmd)
}
