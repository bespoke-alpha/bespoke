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
	name        string
	version     string
	authors     []string
	description string
	tags        []string
	entries     struct {
		js    string
		css   string
		mixin string
	}
	dependencies    []string
	spotifyVersions string
}

func (m Metadata) getIdentifier() string {
	return filepath.Join(m.authors[0], m.name)
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
	metadataURL MetadataURL
	identifier  Identifier
}

type Vault struct {
	modules []MinimalModule
}

// <owner>/<repo>/<branch|tag|commit>/path/to/module/metadata.json
type MetadataURL = string

// <owner>/<module>
type Identifier = string

var modulesFolder = filepath.Join(paths.ConfigPath, "modules")

func parseMetadata(r io.Reader) (Metadata, error) {
	var metadata Metadata
	if err := json.NewDecoder(r).Decode(&metadata); err != nil {
		return Metadata{}, err
	}
	return metadata, nil
}

func fetchMetadata(metadataURL MetadataURL) (Metadata, error) {
	rawUrl := "http://raw.githubusercontent.com/" + metadataURL
	res, err := http.Get(rawUrl)
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
	re := regexp.MustCompile(`^(?<owner>.+?)/(?<repo>.+?)/(?<version>.+?)/(?<path>.*?)/?metadata\.json$`)
	submatches := re.FindStringSubmatch(metadataURL)
	if len(submatches) < 4 {
		return GithubPath{}, errors.New("URL cannot be parsed!")
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
		break
	case "tag":
		url += "refs/tags/" + module.githubPath.version.tag
		break
	case "branch":
		url += "regs/heads/" + module.githubPath.version.branch
		break
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

func installModule(metadataURL MetadataURL) error {
	module, err := fetchModule(metadataURL)
	if err != nil {
		return err
	}

	return downloadModule(module)
}

func deleteLocaleModule(identifier Identifier) error {
	moduleFolder := filepath.Join(modulesFolder, identifier)
	return os.RemoveAll(moduleFolder)
}

func updateModule(metadataURL MetadataURL) error {
	metadata, err := fetchMetadata(metadataURL)
	if err != nil {
		return err
	}

	identifier := metadata.getIdentifier()

	localMetadata, err := fetchLocalMetadata(identifier)
	if err != nil {
		return err
	}

	if metadata.version == localMetadata.version {
		return nil
	}

	if err := deleteLocaleModule(identifier); err != nil {
		return err
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

// This would need a centralized manifest to match possible identifiers
// func identifierToMetadataURL(identifier Identifier) (MetadataURL, error) {}
