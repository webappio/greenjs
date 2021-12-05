package cmd

import (
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
	content, _ := ioutil.ReadDir(distDir)
	for _, file := range content {
		err := os.RemoveAll(filepath.Join(distDir, file.Name()))
		if err != nil {
			log.Fatal(err)
		}
	}
	os.MkdirAll(distDir, 0o750)
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
	server := &GreenJsServer{}
	go func() {
		err := server.Serve(listener)
		if err != nil {
			log.Fatal(err)
		}
	}()

	defer server.Stop()

	err = (&Prerenderer{URI: "http://127.0.0.1:"+fmt.Sprint(listener.Addr().(*net.TCPAddr).Port)}).RenderAll()
	if err != nil {
		log.Fatal(err)
	}
}
