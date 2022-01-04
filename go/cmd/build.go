package cmd

import (
	"encoding/json"
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/webappio/greenjs/go/config"
	"io/ioutil"
	"log"
	"net"
	"os"
	"path/filepath"
	"sync"
)

func Build(args []string) {
	conf := config.Defaults()
	err := conf.Read("greenjs.json")
	if err != nil {
		log.Fatal(err)
	}
	buildOpts, err := conf.ToBuildOptions(false)
	if err != nil {
		log.Fatal(err)
	}

	prerenderer := &Prerenderer{
		Config: conf,
	}
	var greenJsServer *GreenJsServer
	var listener net.Listener

	wg := sync.WaitGroup{}
	wg.Add(1)
	go func() {
		var err error
		listener, err = net.Listen("tcp", "127.0.0.1:")
		if err != nil {
			log.Fatal(err)
		}

		prerenderer.URI = "http://127.0.0.1:" + fmt.Sprint(listener.Addr().(*net.TCPAddr).Port)
		greenJsServer = &GreenJsServer{
			PageIsRoute: func(s string) bool {
			_, ok := prerenderer.pagesVisited.Load(s)
			return ok
			},
			BuildOpts: &buildOpts,
		}

		go func() {
			err := greenJsServer.Serve(listener)
			if err != nil {
				log.Fatal(err)
			}
		}()

		wg.Done()
		log.Println("Started server!")
	}()

	go func() {
		err := prerenderer.Start()
		if err != nil {
			log.Fatal(err)
		}
	}()

	wg.Add(1)
	go func() {
		result := api.Build(buildOpts)

		if len(result.Errors) > 0 {
			for _, err := range result.Errors {
				log.Println(fmt.Sprintf("%v:%v %v", err.Location.File, err.Location.Line, err.Text))
			}
			os.Exit(1)
		}
		wg.Done()
		log.Println("Built!")
	}()

	wg.Wait()
	defer listener.Close()
	defer prerenderer.Cancel()
	defer greenJsServer.Stop()

	log.Println("Rendering pages...")
	err = prerenderer.RenderAll()
	if err != nil {
		log.Fatal(err)
	}

	pagesVisitedList := []string{}
	prerenderer.GetPagesVisited().Range(func(key, _ interface{}) bool {
		pagesVisitedList = append(pagesVisitedList, key.(string))
		return true
	})

	marshalledPages, err := json.MarshalIndent(pagesVisitedList, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(filepath.Join(buildOpts.Outdir, "routes.json"), marshalledPages, 0o600)
	if err != nil {
		log.Fatal(err)
	}
}
