package cmd

import (
	"encoding/json"
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"io/ioutil"
	"log"
	"net"
	"os"
	"path/filepath"
)

func Build(args []string) {
	distDir := "dist"
	buildOpts := DefaultBuildOptions
	buildOpts.MinifyWhitespace = true
	buildOpts.MinifySyntax = true
	buildOpts.MinifyIdentifiers = true
	result := api.Build(buildOpts)

	if len(result.Errors) > 0 {
		os.Exit(1)
	}

	listener, err := net.Listen("tcp", "127.0.0.1:")
	if err != nil {
		log.Fatal(err)
	}

	prerenderer := &Prerenderer{
		URI: "http://127.0.0.1:"+fmt.Sprint(listener.Addr().(*net.TCPAddr).Port),
	}

	server := &GreenJsServer{PageIsRoute: func(s string) bool {
		_, ok := prerenderer.pagesVisited.Load(s)
		return ok
	}}

	go func() {
		err := server.Serve(listener)
		if err != nil {
			log.Fatal(err)
		}
	}()

	defer server.Stop()

	err = prerenderer.RenderAll()
	if err != nil {
		log.Fatal(err)
	}

	pagesVisitedList := []string{}
	prerenderer.GetPagesVisited().Range(func(key, _ interface{}) bool {
		pagesVisitedList = append(pagesVisitedList, key.(string))
		return true
	})

	marshalledPages, err := json.MarshalIndent(pagesVisitedList,  "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	err = ioutil.WriteFile(filepath.Join(distDir, "routes.json"), marshalledPages, 0o600)
	if err != nil {
		log.Fatal(err)
	}
}
