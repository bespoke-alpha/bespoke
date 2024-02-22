/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"archive/zip"
	"bespoke/paths"
	"fmt"
	"io"
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
		fmt.Println("Initializing bespoke")
		src := paths.GetSpotifyAppsPath(spotify)
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

		for _, spa := range spas {
			basename := filepath.Base(spa)
			extractDest := filepath.Join(dest, strings.TrimSuffix(basename, ".spa"))
			log.Println("Extracting", spa, "to", extractDest)
			err = Unzip(spa, extractDest)
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
	},
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

// pasta from https://stackoverflow.com/a/24792688
func Unzip(src, dest string) error {
	r, err := zip.OpenReader(src)
	if err != nil {
		return err
	}
	defer func() {
		if err := r.Close(); err != nil {
			panic(err)
		}
	}()

	os.MkdirAll(dest, 0755)

	// Closure to address file descriptors issue with all the deferred .Close() methods
	extractAndWriteFile := func(f *zip.File) error {
		rc, err := f.Open()
		if err != nil {
			return err
		}
		defer func() {
			if err := rc.Close(); err != nil {
				panic(err)
			}
		}()

		path := filepath.Join(dest, f.Name)

		// Check for ZipSlip (Directory traversal)
		if !strings.HasPrefix(path, filepath.Clean(dest)+string(os.PathSeparator)) {
			return fmt.Errorf("illegal file path: %s", path)
		}

		if f.FileInfo().IsDir() {
			os.MkdirAll(path, f.Mode())
		} else {
			os.MkdirAll(filepath.Dir(path), f.Mode())
			f, err := os.OpenFile(path, os.O_WRONLY|os.O_CREATE|os.O_TRUNC, f.Mode())
			if err != nil {
				return err
			}
			defer func() {
				if err := f.Close(); err != nil {
					panic(err)
				}
			}()

			_, err = io.Copy(f, rc)
			if err != nil {
				return err
			}
		}
		return nil
	}

	for _, f := range r.File {
		err := extractAndWriteFile(f)
		if err != nil {
			return err
		}
	}

	return nil
}
