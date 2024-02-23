### Installation
// TODO

### Setup
Note: All windows commands are to be run inside a windows' `Terminal` app (powershell) and not `cmd`!

1. First and foremost add the bespoke executable to your PATH variable for ease of access:
    - On Windows, run the following in pwsh: 
      ```
      $user = [EnvironmentVariableTarget]::User
      $path = [Environment]::GetEnvironmentVariable('PATH', $user)
      $path = "$path;$env:localappdata\bespoke\cli"
      [Environment]::SetEnvironmentVariable('PATH', $path, $user)
      ```
    - On Linux, the executable should be located at $XDG_CONFIG_HOME/bespoke/cli/
2. Then simply run `bespoke init` to patch the Spotify desktop client, this needs only be done
   when using bespoke for the first time or when the Spotify client updates (and reverts all the patches).
   If you get a permission error, then you can try running the command in a privileged environment,
   either by opening the terminal as administrator or by using sudo.

You can always restore your Spotify installation by running `bespoke fix`.

### Caviats
If your Spotify installation is somewhat unusual, then you have to specify the paths to the Spotify data and Spotify config folders manually.
You can do that by creating a `config.yaml` file and adding a `spotify-data: path/to/spotify/data/`
(and optionally a `spotify-config: path/to/spotify/config/` for more advanced dev workflows)
Furthermore, if the Spotify folder is Frozen (like the Microsoft Store version of Spotify), you have must tell bespoke to use the mirror mode.
For the Microsoft Store version of Spotify, this would be enough:
  ```
  $configPath = $env:LOCALAPPDATA\bespoke\config.yaml
  $spotifyPackage = Get-AppxPackage | Where-Object -Property Name -Eq "SpotifyAB.SpotifyMusic"
  echo mirror: true >> $configPath
  echo spotify-data: $spotifyPackage.InstallLocation >> $configPath
  echo spotify-config: $env:LOCALAPPDATA\Packages\$spotifyPackage.PackageFamilyName\LocalState\Spotify\ >> $configPath
  ```

### Advanced Usage
// TODO

### Credits
[spicetify-cli](https://github.com/spicetify/spicetify-cli)
[hazy](https://github.com/Astromations/Hazy)
