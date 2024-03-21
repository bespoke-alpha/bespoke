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
	"path"
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
	Enabled           bool        `json:"enabled"`
	MetadataURL       MetadataURL `json:"metadata"`
	RemoteMetadataURL MetadataURL `json:"remoteMetadata"`
}

type Vault struct {
	Modules map[string]MinimalModule `json:"modules"`
}

// https://raw.githubusercontent.com/<owner>/<repo>/<branch|tag|commit>/path/to/module/metadata.json
type MetadataURL = string

// <owner>/<module>
type Identifier = string

var modulesFolder = filepath.Join(paths.ConfigPath, "modules")

var vaultPath = filepath.Join(modulesFolder, "vault.json")

func GetVault() (Vault, error) {
	file, err := os.Open(vaultPath)
	if err != nil {
		return Vault{}, err
	}
	defer file.Close()

	var vault Vault
	err = json.NewDecoder(file).Decode(&vault)
	return vault, err
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

func getLocalMetadataFile(identifier Identifier) string {
	return "/modules/" + identifier + "/metadata.json"
}

func fetchLocalMetadata(identifier string) (Metadata, error) {
	moduleFolder := path.Join(modulesFolder, identifier)
	metadataFile := path.Join(moduleFolder, "metadata.json")

	file, err := os.Open(metadataFile)
	if err != nil {
		return Metadata{}, err
	}
	defer file.Close()

	return parseMetadata(file)
}

func parseGithubPath(metadataURL MetadataURL) (GithubPath, error) {
	re := regexp.MustCompile(`https://raw.githubusercontent.com/(?<owner>[^/]+)/(?<repo>[^/]+)/(?<version>[^/]+)/(?<path>.*?)/?metadata\.json$`)
	submatches := re.FindStringSubmatch(metadataURL)
	if submatches == nil {
		return GithubPath{}, errors.New("URL cannot be parsed")
	}

	owner := submatches[1]
	repo := submatches[2]
	v := submatches[3]
	path := submatches[4]

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
		url += "refs/heads/" + module.githubPath.version.branch

	}

	url += ".tar.gz"

	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	moduleFolder := filepath.Join(modulesFolder, module.metadata.getIdentifier())

	return archive.UnTarGZ(res.Body, module.githubPath.path, moduleFolder)
}

func AddModuleMURL(metadataURL MetadataURL) error {
	metadata, err := fetchMetadata(metadataURL)
	if err != nil {
		return err
	}

	identifier := metadata.getIdentifier()

	localMetadataFile := getLocalMetadataFile(identifier)

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

	err = downloadModule(Module{
		metadata,
		githubPath,
	})
	if err != nil {
		return err
	}

	return AddModuleInVault(identifier, MinimalModule{Enabled: true, MetadataURL: localMetadataFile, RemoteMetadataURL: metadataURL})
}

func RemoveModule(identifier Identifier) error {
	moduleFolder := filepath.Join(modulesFolder, identifier)
	err := RemoveModuleInVault(identifier)
	if err != nil {
		return err
	}
	return os.RemoveAll(moduleFolder)
}

func mutateVault(mutate func(*Vault)) error {
	vault, err := GetVault()
	if err != nil {
		return err
	}

	mutate(&vault)

	vaultJson, err := json.Marshal(vault)
	if err != nil {
		return err
	}

	return os.WriteFile(vaultPath, vaultJson, 0700)
}

func AddModuleInVault(identifier Identifier, module MinimalModule) error {
	return mutateVault(func(vault *Vault) {
		(*vault).Modules[identifier] = module
	})
}

func ToggleModuleInVault(identifier Identifier, enabled bool) error {
	vault, err := GetVault()
	if err != nil {
		return err
	}

	module := vault.Modules[identifier]
	module.Enabled = enabled

	return AddModuleInVault(identifier, module)
}

func RemoveModuleInVault(identifier Identifier) error {
	return mutateVault(func(vault *Vault) {
		delete((*vault).Modules, identifier)
	})
}

func getVaultMURLFromIdentifier(identifier Identifier) (MetadataURL, error) {
	vault, err := GetVault()
	if err != nil {
		return "", err
	}

	metadataURL := vault.Modules[identifier].MetadataURL
	if metadataURL == "" {
		err = errors.New("Can't find a module for the identifier " + identifier)
	}

	return metadataURL, err
}
