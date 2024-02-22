/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package main

import (
	"bespoke/cmd"
)

func main() {
	cmd.Execute()
}

/*
// Windows: add bespoke to PATH
$user = [EnvironmentVariableTarget]::User
$path = [Environment]::GetEnvironmentVariable('PATH', $user)
$path = "$path;$env:localappdata\bespoke\cli"
[Environment]::SetEnvironmentVariable('PATH', $path, $user)

// Windows: spotify path for Microsoft Store version
$spotify = (Get-AppxPackage | Where-Object -Property Name -Eq "SpotifyAB.SpotifyMusic").InstallLocation
$spotifyPackageName = (Get-AppxPackage | Where-Object -Property Name -Match "^SpotifyAB").PackageFamilyName
$spotifyConfig = (echo $env:localappdata\Packages\$spotifyPackageName\LocalState\Spotify\)
bespoke --spotify=$spotify --spotify-config=$spotifyConfig --mirror <...>
*/
