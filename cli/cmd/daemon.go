/*
Copyright © 2024 Delusoire <deluso7re@outlook.com>
*/
package cmd

import (
	"log"
	"net/http"
	"strings"

	"github.com/fsnotify/fsnotify"
	"github.com/spf13/cobra"
	"github.com/spf13/viper"

	"github.com/gorilla/websocket"
)

var (
	daemon = viper.GetBool("daemon")
)

var daemonCmd = &cobra.Command{
	Use:   "daemon",
	Short: "Run daemon",
	Run: func(cmd *cobra.Command, args []string) {
		if daemon {
			log.Println("Starting daemon")
			startDaemon()
		}
	},
}

var daemonEnableCmd = &cobra.Command{
	Use:   "enable",
	Short: "Enable daemon",
	Run: func(cmd *cobra.Command, args []string) {
		if daemon {
			log.Panicln("Daemon already enabled")
		}
		log.Println("Enabling daemon")
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
		log.Println("Disabling daemon")
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
					if strings.HasSuffix(event.Name, "xpui.spa") {
						if err := execApply(); err != nil {
							log.Println(err.Error())
						}
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

	err = watcher.Add(spotifyDataPath)
	if err != nil {
		log.Fatalln(err)
	}

	http.HandleFunc("/protocol", handleWebSocketProtocol)
	log.Panicln(http.ListenAndServe("localhost:7967", nil))

	<-c
}

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool {
		// TODO: improve security
		return true
	},
}

func handleWebSocketProtocol(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("upgrade:", err)
		return
	}
	defer c.Close()

	for {
		_, p, err := c.ReadMessage()
		if err != nil {
			log.Println("!read:", err)
			break
		}

		incoming := string(p)
		log.Println("recv:", incoming)
		if err = HandleProtocol(incoming); err != nil {
			log.Println("!handle:", err)
		}
	}
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
				execApply()
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
