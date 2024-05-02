## Setup

Note: On windows, use `pwsh` and not `cmd` as shell!

### Part 1: Installation

0. First and foremost install the build dependencies: [Git](https://git-scm.com/downloads) and [Go](https://go.dev/doc/install)
1. Then clone this repo in the appropriate folder:
    - On Windows, `git clone --depth 1 --recurse-submodules https://github.com/Delusoire/bespoke $env:LOCALAPPDATA/bespoke`
    - On Linux, `git clone --depth 1 --recurse-submodules https://github.com/Delusoire/bespoke $XDG_CONFIG_HOME/bespoke` (if $XDG_CONFIG_HOME is not set, use `~/.config`)
    - On macOS, `git clone --depth 1 --recurse-submodules https://github.com/Delusoire/bespoke "$HOME/Library/Application Support/bespoke"`
2. Change directory to `bespoke/cli/` and execute `go build .`, this will create a new `bespoke` executable in the working directory
3. [optional] Add the `bespoke` executable to your PATH variable for ease of access
    - On Windows, run the following in pwsh:
        ```pwsh
        $user = [EnvironmentVariableTarget]::User
        $path = [Environment]::GetEnvironmentVariable('PATH', $user)
        $path = "$path;$env:LOCALAPPDATA\bespoke\cli"
        [Environment]::SetEnvironmentVariable('PATH', $path, $user)
        ```
    - On a default macOS installation, run the following:
        ```zsh
        echo "$HOME/Library/Application Support/bespoke/cli" >> /etc/paths
        ```
    - On other platforms you can perform a simple search on how to set the PATH environment variable
4. Run `bespoke init` to initialize the bespoke setup, this only needs to be done once. If the command files, try running it in an elevated shell (as Administrator)

### Part 2: Patching

4. Run `bespoke apply` to patch the Spotify desktop client, this needs only be done
   when using bespoke for the first time or when the Spotify client updates (and reverts all the patches).

You can always revert this by running `bespoke fix`.

### Part 3: Updating

To update bespoke, all you need to run is `git pull --recurse-submodules`

## Caveats

If your Spotify installation is somewhat unusual, then you have to specify the paths to the Spotify data and Spotify config folders manually.
You can do that by creating a `config.yaml` file and adding a `spotify-data: path/to/spotify/data/`
(and optionally a `spotify-config: path/to/spotify/config/` for more advanced dev workflows)
Furthermore, if the Spotify folder is Frozen (like the Microsoft Store version of Spotify), you have must tell bespoke to use the mirror mode.
For the Microsoft Store version of Spotify, this would be enough:

```
$configPath = "$env:LOCALAPPDATA\bespoke\config.yaml"
$spotifyPackage = Get-AppxPackage | Where-Object -Property Name -Eq "SpotifyAB.SpotifyMusic"
"mirror: true" >> $configPath
"spotify-data: $($spotifyPackage.InstallLocation)" >> $configPath
"spotify-config: $env:LOCALAPPDATA\Packages\$($spotifyPackage.PackageFamilyName)\LocalState\Spotify\" >> $configPath
```

## Advanced Usage

`bespoke daemon enable`

// TODO

### Todos

-    Improve spotify paths recognition on Linux
-    Add linux desktop entry (for custom url scheme)
-    Improve classname remapping:
    -    Hook into postcss & swc transpilation
    -    Maintain classname maps on a per version basis
-    Add a "spotify.version" semver prop to Metadata.json that will be used to disable non-conforming modules
