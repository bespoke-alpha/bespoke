/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/archive"
	"bespoke/paths"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"runtime"
	"strings"

	"github.com/Microsoft/go-winio"
	"github.com/spf13/cobra"
	"golang.org/x/sys/windows"
)

var applyCmd = &cobra.Command{
	Use:   "apply",
	Short: "Apply bespoke patch on Spotify",
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

func createJunction(target, mountPt string) error {
	_target, err := filepath.Abs(target)
	if err != nil {
		return fmt.Errorf("failed to get absolute path of target %s: %v", target, err)
	}
	_mountPt, err := windows.UTF16PtrFromString(mountPt)
	if err != nil {
		return fmt.Errorf("failed to get UTF16 pointer of mount point %s: %v", mountPt, err)
	}

	err = os.Mkdir(mountPt, 0777)
	if err != nil {
		return fmt.Errorf("failed to create directory %s: %v", mountPt, err)
	}
	defer func() {
		if err != nil {
			os.Remove(mountPt)
		}
	}()

	handle, err := windows.CreateFile(_mountPt,
		windows.GENERIC_WRITE,
		0,
		nil,
		windows.OPEN_EXISTING,
		windows.FILE_FLAG_BACKUP_SEMANTICS,
		0)
	if err != nil {
		return fmt.Errorf("failed to create file handle for %s: %v", mountPt, err)
	}
	defer windows.CloseHandle(handle)

	rp := winio.ReparsePoint{
		Target:       _target,
		IsMountPoint: true,
	}
	data := winio.EncodeReparsePoint(&rp)

	var size uint32
	err = windows.DeviceIoControl(
		handle,
		windows.FSCTL_SET_REPARSE_POINT,
		&data[0],
		uint32(len(data)),
		nil,
		0,
		&size,
		nil)
	if err != nil {
		return fmt.Errorf("failed to set reparse point: %v", err)
	}
	return nil
}

func linkFiles(destXpuiPath string) error {
	links := map[string]string{"hooks-out": "hooks", "modules": "modules"}
	linkFunc := os.Symlink
	linkType := "Symlinking"

	if runtime.GOOS == "windows" {
		linkFunc = createJunction
		linkType = "Junctioning"
	}

	for src, dest := range links {
		folderSrcPath := filepath.Join(paths.ConfigPath, src)
		folderDestPath := filepath.Join(destXpuiPath, dest)
		log.Println(linkType, folderSrcPath, "->", folderDestPath)
		if err := linkFunc(folderSrcPath, folderDestPath); err != nil {
			return fmt.Errorf("failed to link %s to %s: %v", folderSrcPath, folderDestPath, err)
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
	return linkFiles(destXpuiPath)
}

func init() {
	rootCmd.AddCommand(applyCmd)
}
