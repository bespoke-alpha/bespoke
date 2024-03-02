//go:build unix

/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package uri

import "errors"

func RegisterURIScheme() error {
	return errors.ErrUnsupported
}
