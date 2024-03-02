/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package archive

import (
	"archive/tar"
	"compress/gzip"
	"io"
	"os"
	"path/filepath"
	"strings"
)

func UnTarGZ(r io.Reader, src string, dest string) error {
	gzipReader, err := gzip.NewReader(r)
	if err != nil {
		return err
	}
	defer gzipReader.Close()

	tarReader := tar.NewReader(gzipReader)

	for {
		header, err := tarReader.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return err
		}

		nameRelToSrc, found := strings.CutPrefix(header.Name, src)
		if !found {
			continue
		}

		tarEntryDest := filepath.Join(dest, nameRelToSrc)

		switch header.Typeflag {
		case tar.TypeDir:
			if err := os.Mkdir(tarEntryDest, 0755); err != nil {
				return err
			}
		case tar.TypeReg:
			tarEntryFile, err := os.Create(tarEntryDest)
			if err != nil {
				return err
			}
			if _, err := io.Copy(tarEntryFile, tarReader); err != nil {
				return err
			}
			tarEntryFile.Close()
		}
	}

	return nil
}
