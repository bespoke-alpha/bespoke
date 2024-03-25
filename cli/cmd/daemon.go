/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"bespoke/paths"
	"log"
	"strings"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"
)

var (
	daemon = viper.GetBool("daemon")
)

var daemonCmd = &cobra.Command{
	Use:   "daemon",
	Short: "Run daemon",
	Run: func(cmd *cobra.Command, args []string) {
		if daemon {
			startDaemon()
		}
	},
}

var daemonEnableCmd = &cobra.Command{
	Use:   "enable",
	Short: "Enable daemon",
	Run: func(cmd *cobra.Command, args []string) {
		daemon = true
		viper.Set("daemon", daemon)
		viper.WriteConfig()
		startDaemon()
	},
}

var daemonDisableCmd = &cobra.Command{
	Use:   "disable",
	Short: "Disable daemon",
	Run: func(cmd *cobra.Command, args []string) {
		daemon = false
		viper.Set("daeeon", daemon)
		viper.WriteConfig()
	},
}

func init() {
	rootCmd.AddCommand(daemonCmd)

	daemonCmd.AddCommand(daemonEnableCmd, daemonDisableCmd)

	viper.SetDefault("daemon", false)
}

func startDaemon() {
	viper.OnConfigChange(func(in fsnotify.Event) {
		daemon = viper.GetBool("daemon")
	})
	go viper.WatchConfig()

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatalln(err)
	}
	defer watcher.Close()

	c := make(chan struct{})

	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					continue
				}
				log.Println("event:", event)
				if event.Has(fsnotify.Write) {
					// TODO: learn how spotify does the update
					// ? Does it delete & replace Apps/ or its contents?
					if strings.HasSuffix(event.Name, ".spa") {
						execInit()
					}
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					continue
				}
				log.Println("error:", err)
			default:
				if !daemon {
					close(c)
				}
			}

		}
	}()

	err = watcher.Add(paths.GetSpotifyAppsPath(spotifyDataPath))
	if err != nil {
		log.Fatalln(err)
	}

	<-c
}

/*
func startDaemon() {
	viper.OnConfigChange(func(in fsnotify.Event) {
		daemon = viper.GetBool("daemon")
	})
	go viper.WatchConfig()

	ticker := time.NewTicker(5 * time.Minute)
	stop := make(chan bool)

	_, apps := getApps()
	xpuiIndex := filepath.Join(apps, "xpui", "index.html")

	go func() {
		for {
			select {
			case <-ticker.C:
				if _, err := os.Stat(xpuiIndex); err == nil {
					continue
				}
				execInit()
			default:
				if !daemon {
					stop <- true
					return
				}
			}
		}
	}()

	<-stop
}
*/
