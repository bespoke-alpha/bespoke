//go:build windows

/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package uri

import (
	"bespoke/paths"
	"path/filepath"

	"golang.org/x/sys/windows/registry"
)

func RegisterURIScheme() error {
	access := uint32(registry.QUERY_VALUE | registry.SET_VALUE)
	key := registry.CURRENT_USER

	key, existing, err := registry.CreateKey(key, `Software\Classes\bespoke`, access)
	if existing {
		return nil
	}
	if err != nil {
		return err
	}
	err = key.SetStringValue("", "URL:bespoke")
	if err != nil {
		return err
	}
	err = key.SetStringValue("URL Protocol", "")
	if err != nil {
		return err
	}

	key, existing, err = registry.CreateKey(key, `shell\open\command`, access)
	if existing {
		return nil
	}
	if err != nil {
		return err
	}
	bin := filepath.Join(paths.ConfigPath, "cli", "bespoke.exe")
	cmd := `"` + bin + `" protocol "%1"`
	return key.SetStringValue("", cmd)
}
