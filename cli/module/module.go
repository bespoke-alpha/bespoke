/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package module

import (
	"bespoke/archive"
	"bespoke/paths"
	"context"
	"encoding/json"
	"errors"
	"io"
	"net/http"
	"net/url"
	"os"
	"path/filepath"
	"regexp"
	"slices"

	"github.com/google/go-github/github"
)

var client = github.NewClient(nil)

type Metadata struct {
	Name        string   `json:"name"`
	Version     string   `json:"version"`
	Authors     []string `json:"authors"`
	Description string   `json:"description"`
	Tags        []string `json:"tags"`
	Entries     struct {
		Js    string `json:"js"`
		Css   string `json:"css"`
		Mixin string `json:"mixin"`
	} `json:"entries"`
	Dependencies    []string `json:"dependencies"`
	SpotifyVersions string   `json:"spotifyVersions"`
}

func (m Metadata) getIdentifier() string {
	return filepath.Join(m.Authors[0], m.Name)
}

type GithubPathVersion struct {
	__type string
	commit string
	tag    string
	branch string
}

type GithubPath struct {
	owner   string
	repo    string
	version GithubPathVersion
	path    string
}

type Module struct {
	metadata   Metadata
	githubPath GithubPath
}

type MinimalModule struct {
	MetadataURL MetadataURL `json:"metadataURL"`
	Identifier  Identifier  `json:"identifier"`
	Enabled     bool        `json:"enabled"`
}

type Vault struct {
	Modules []MinimalModule `json:"modules"`
}

// https://raw.githubusercontent.com/<owner>/<repo>/<branch|tag|commit>/path/to/module/metadata.json
type MetadataURL = string

// <owner>/<module>
type Identifier = string

var modulesFolder = filepath.Join(paths.ConfigPath, "modules")

func parseVault() (Vault, error) {
	vaultFile := filepath.Join(modulesFolder, "vault.json")
	file, err := os.Open(vaultFile)
	if err != nil {
		return Vault{}, err
	}
	defer file.Close()

	var vault Vault
	err = json.NewDecoder(file).Decode(&vault)
	return vault, err
}

var vault *Vault

func GetVault() (Vault, error) {
	if vault != nil {
		return *vault, nil
	}
	_vault, err := parseVault()
	vault = &_vault
	return _vault, err
}

func parseMetadata(r io.Reader) (Metadata, error) {
	var metadata Metadata
	if err := json.NewDecoder(r).Decode(&metadata); err != nil {
		return Metadata{}, err
	}
	return metadata, nil
}

func fetchMetadata(metadataURL MetadataURL) (Metadata, error) {
	res, err := http.Get(metadataURL)
	if err != nil {
		return Metadata{}, err
	}
	defer res.Body.Close()

	return parseMetadata(res.Body)
}

func fetchLocalMetadata(identifier Identifier) (Metadata, error) {
	moduleFolder := filepath.Join(modulesFolder, identifier)
	metadataFile := filepath.Join(moduleFolder, "metadata.json")

	file, err := os.Open(metadataFile)
	if err != nil {
		return Metadata{}, err
	}
	defer file.Close()

	return parseMetadata(file)
}

func parseGithubPath(metadataURL MetadataURL) (GithubPath, error) {
	re := regexp.MustCompile(`(?<owner>.+?)/(?<repo>.+?)/(?<version>.+?)/(?<path>.*?)/?metadata\.json$`)
	submatches := re.FindStringSubmatch(metadataURL)
	if len(submatches) < 4 {
		return GithubPath{}, errors.New("URL cannot be parsed")
	}

	owner := submatches[0]
	repo := submatches[1]
	v := submatches[2]
	path := submatches[3]

	branches, _, err := client.Repositories.ListBranches(context.Background(), owner, repo, &github.ListOptions{})
	if err != nil {
		return GithubPath{}, err
	}

	branchNames := []string{}

	for branch := range branches {
		branchNames = append(branchNames, branches[branch].GetName())
	}

	var version GithubPathVersion
	if len(v) == 40 {
		version = GithubPathVersion{
			__type: "commit",
			commit: v,
		}
	} else if slices.Contains(branchNames, v) {
		version = GithubPathVersion{
			__type: "branch",
			branch: v,
		}
	} else {
		tag, err := url.QueryUnescape(v)
		if err != nil {
			return GithubPath{}, err
		}

		version = GithubPathVersion{
			__type: "tag",
			tag:    tag,
		}
	}

	return GithubPath{
		owner,
		repo,
		version,
		path,
	}, nil
}

func fetchModule(metadataURL MetadataURL) (Module, error) {
	metadata, err := fetchMetadata(metadataURL)
	if err != nil {
		return Module{}, err
	}
	githubPath, err := parseGithubPath(metadataURL)
	if err != nil {
		return Module{}, err
	}

	return Module{
		metadata,
		githubPath,
	}, nil
}

func downloadModule(module Module) error {
	url := "https://github.com/" + module.githubPath.owner + "/" + module.githubPath.repo + "/archive/"

	switch module.githubPath.version.__type {
	case "commit":
		url += module.githubPath.version.commit

	case "tag":
		url += "refs/tags/" + module.githubPath.version.tag

	case "branch":
		url += "regs/heads/" + module.githubPath.version.branch

	}

	url += ".tar.gz"

	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	moduleFolder := filepath.Join(modulesFolder, module.metadata.getIdentifier())

	archive.UnTarGZ(res.Body, module.githubPath.path, moduleFolder)

	return nil
}

// TODO: add module entry to vault.json
func AddModuleMURL(metadataURL MetadataURL) error {
	metadata, err := fetchMetadata(metadataURL)
	if err != nil {
		return err
	}

	identifier := metadata.getIdentifier()

	localMetadata, err := fetchLocalMetadata(identifier)
	if err == nil {
		if metadata.Version == localMetadata.Version {
			return nil
		}

		if err := RemoveModule(identifier); err != nil {
			return err
		}
	}

	githubPath, err := parseGithubPath(metadataURL)
	if err != nil {
		return err
	}

	return downloadModule(Module{
		metadata,
		githubPath,
	})
}

// TODO: remove module entry from vault.json
func RemoveModule(identifier Identifier) error {
	moduleFolder := filepath.Join(modulesFolder, identifier)
	return os.RemoveAll(moduleFolder)
}

// TODO:
func EnableModule(identifier Identifier) error {
	return errors.ErrUnsupported
}

// TODO:
func DisableModule(identifier Identifier) error {
	return errors.ErrUnsupported
}

func getVaultMURLFromIdentifier(identifier Identifier) (MetadataURL, error) {
	vault, err := GetVault()
	if err != nil {
		return "", err
	}

	var metadataURL MetadataURL
	for module := range vault.Modules {
		if vault.Modules[module].Identifier == identifier {
			metadataURL = vault.Modules[module].MetadataURL
			break
		}
	}

	if metadataURL == "" {
		err = errors.New("Can't find a module for the identifier " + identifier)
	}

	return metadataURL, err
}
