/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/archive"
	"bespoke/paths"
	"log"
	"os"
	"path/filepath"
	"strings"

	"github.com/spf13/cobra"
)

var applyCmd = &cobra.Command{
	Use:   "init",
	Short: "initialize bespoke for Spotify",
	Run: func(cmd *cobra.Command, args []string) {
		if err := execApply(); err != nil {
			log.Panicln(err.Error())
		}
	},
}

func getApps() (src string, dest string) {
	src = paths.GetSpotifyAppsPath(spotifyDataPath)
	if mirror {
		dest = filepath.Join(paths.ConfigPath, "apps")
	} else {
		dest = src
	}
	return src, dest
}

func extractSpa(spa string, destFolder string) error {
	basename := filepath.Base(spa)
	extractDest := filepath.Join(destFolder, strings.TrimSuffix(basename, ".spa"))
	log.Println("Extracting", spa, "->", extractDest)
	if err := archive.Unzip(spa, extractDest); err != nil {
		return err
	}
	if !mirror {
		spaBak := spa + ".bak"
		log.Println("Moving", spa, "->", spaBak)
		if err := os.Rename(spa, spaBak); err != nil {
			return err
		}
	}
	return nil
}

func patchFile(path string, patch func(string) string) error {
	raw, err := os.ReadFile(path)
	if err != nil {
		return err
	}

	content := patch(string(raw))

	return os.WriteFile(path, []byte(content), 0700)
}

func patchIndexHtml(destXpuiPath string) error {
	log.Println("Patching xpui/index.html")
	return patchFile(filepath.Join(destXpuiPath, "index.html"), func(s string) string {
		return strings.Replace(s, `<script defer="defer" src="/vendor~xpui.js"></script><script defer="defer" src="/xpui.js"></script>`, `<script type="module" src="/hooks/index.js"></script>`, 1)
	})
}

func symlinkFiles(destXpuiPath string) error {
	links := map[string]string{"hooks-out": "hooks", "modules": "modules"}
	for src, dest := range links {
		folderSrcPath := filepath.Join(paths.ConfigPath, src)
		folderDestPath := filepath.Join(destXpuiPath, dest)
		log.Println("Symlinking", folderSrcPath, "->", folderDestPath)
		if err := os.Symlink(folderSrcPath, folderDestPath); err != nil {
			return err
		}
	}
	return nil
}

func execApply() error {
	log.Println("Initializing bespoke")
	src, dest := getApps()

	spa := filepath.Join(src, "xpui.spa")
	if err := extractSpa(spa, dest); err != nil {
		return err
	}

	destXpuiPath := filepath.Join(dest, "xpui")
	if err := patchIndexHtml(destXpuiPath); err != nil {
		return err
	}
	return symlinkFiles(destXpuiPath)
}

func init() {
	rootCmd.AddCommand(applyCmd)
}
