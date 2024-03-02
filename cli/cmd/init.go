/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/archive"
	"bespoke/paths"
	"bespoke/uri"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var initCmd = &cobra.Command{
	Use:   "init",
	Short: "initialize bespoke for Spotify",
	Run: func(cmd *cobra.Command, args []string) {
		if err := uri.RegisterURIScheme(); err != nil {
			log.Println(err.Error())
		}
		execInit()
	},
}

func execInit() {
	fmt.Println("Initializing bespoke")
	src := paths.GetSpotifyAppsPath(spotifyDataPath)
	var dest string
	if mirror {
		dest = filepath.Join(paths.ConfigPath, "apps")
	} else {
		dest = src
	}
	spaGlob := filepath.Join(src, "*.spa")
	spas, err := filepath.Glob(spaGlob)
	if err != nil {
		log.Fatalln(err.Error())
	}
	if len(spas) == 0 {
		log.Println("bespoke is already initialized or Spotify data path is wrong!")
		return
	}

	for _, spa := range spas {
		basename := filepath.Base(spa)
		extractDest := filepath.Join(dest, strings.TrimSuffix(basename, ".spa"))
		log.Println("Extracting", spa, "to", extractDest)
		err = archive.Unzip(spa, extractDest)
		if err != nil {
			log.Fatalln(err.Error())
		}
	}

	if !mirror {
		for _, spa := range spas {
			spaBak := spa + ".bak"
			log.Println("Moving", spa, "to", spaBak)
			err = os.Rename(spa, spaBak)
			if err != nil {
				log.Println(err.Error())
			}
		}
	}

	destXpuiPath := filepath.Join(dest, "xpui")
	err = PatchFile(filepath.Join(destXpuiPath, "index.html"), func(s string) string {
		return strings.Replace(s, `<script defer="defer" src="/vendor~xpui.js"></script><script defer="defer" src="/xpui.js"></script>`, `<script type="module" src="/hooks/index.js"></script>`, 1)
	})
	if err != nil {
		log.Fatalln(err.Error())
	}

	links := map[string]string{"hooks-out": "hooks", "modules": "modules"}
	for src, dest := range links {
		folderSrcPath := filepath.Join(paths.ConfigPath, src)
		folderDestPath := filepath.Join(destXpuiPath, dest)
		log.Println("Symlinking", folderSrcPath, "to", folderDestPath)
		err = os.Symlink(folderSrcPath, folderDestPath)
		if err != nil {
			log.Fatalln(err.Error())
		}
	}
}

func init() {
	rootCmd.AddCommand(initCmd)
}

func PatchFile(path string, patch func(string) string) error {
	raw, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	content := patch(string(raw))

	return os.WriteFile(path, []byte(content), 0700)
}
