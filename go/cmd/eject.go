package cmd

import (
	"encoding/json"
	"github.com/webappio/greenjs/go/config"
	"log"
	"os"
)

func Eject(args []string) {
	if _, err := os.Stat("greenjs.json"); err == nil {
		log.Fatal("greenjs.json already exists. Delete it in order to re-eject.")
	} else if !os.IsNotExist(err) {
		log.Fatal(err)
	}

	conf := config.Defaults()
	out, err := os.OpenFile("greenjs.json", os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0644)
	if err != nil {
		log.Fatal("could not create greenjs.json:", err)
	}
	enc := json.NewEncoder(out)
	enc.SetIndent("", "  ")
	err = enc.Encode(conf)
	if err != nil {
		log.Fatal("could not encode greenjs.json:", err)
	}
	log.Println("Created greenjs.json")
}