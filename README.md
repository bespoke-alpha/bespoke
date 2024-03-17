## Setup

Note: On windows, use `pwsh` and not `cmd` as shell!

### Part 1: Installation

0. First and foremost install the build dependencies: [Git](https://git-scm.com/downloads) and [Go](https://go.dev/doc/install)
1. Then clone this repo in the appropriate folder:
    - On Windows, `git clone --depth 1 --recurse-submodules $env:LOCALAPPDATA/bespoke`
    - On Linux, `git clone --depth 1 --recurse-submodules $XDG_CONFIG_HOME/bespoke` (if $XDG_CONFIG_HOME is not set, use `~/.config`)
    - On macOS, `git clone --depth 1 --recurse-submodules ~/Library/Application Support/bespoke`
2. Change directory to `bespoke/cli/` and execute `go build .`, this will create a new `bespoke` executable in the working directory
3. [optional] Add the `bespoke` executable to your PATH variable for ease of access
    - On Windows, run the following in pwsh:
        ```pwsh
        $user = [EnvironmentVariableTarget]::User
        $path = [Environment]::GetEnvironmentVariable('PATH', $user)
        $path = "$path;$env:LOCALAPPDATA\bespoke\cli"
        [Environment]::SetEnvironmentVariable('PATH', $path, $user)
        ```
    - On other platforms you can perform a simple search on how to set the PATH environment variable

### Part 2: Patching

4. Run `bespoke init` to patch the Spotify desktop client, this needs only be done
   when using bespoke for the first time or when the Spotify client updates (and reverts all the patches).

You can always revert this by running `bespoke fix`.

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

// TODO

## Credits

[spicetify-cli](https://github.com/spicetify/spicetify-cli)

### Todos

-   Fix marketplace styles
-   Improve platform specific spotify paths recognition
-   Add linux desktop entry (for custom url scheme)
-   Create cli command for module project scaffolding
