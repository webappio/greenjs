package cmd

import (
	"context"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/webappio/greenjs/go/httpserver"
	"github.com/webappio/greenjs/go/resources"
	"io/ioutil"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

func Build() {
	distDir := "dist"
	content, _ := ioutil.ReadDir(distDir)
	for _, file := range content {
		err := os.RemoveAll(filepath.Join(distDir, file.Name()))
		if err != nil {
			log.Fatal(err)
		}
	}
	os.MkdirAll(distDir, 0o750)
	result := api.Build(api.BuildOptions{
		EntryPoints: []string{"App.js"},
		Outdir:      filepath.Join(distDir, "bundles"),
		Bundle:      true,
		Write:       true,
		Splitting:   true,
		Format:      api.FormatESModule,
		MinifyIdentifiers: true,
		MinifySyntax:      true,
		MinifyWhitespace:  true,
		LogLevel: api.LogLevelInfo,
		Loader: map[string]api.Loader{
			".jsx": api.LoaderJSX,
			".js":  api.LoaderJSX,
		},
		Define: map[string]string{"window.DoHydrate": "true"},
	})

	if len(result.Errors) > 0 {
		os.Exit(1)
	}

	server := &http.Server{Addr: ":8000", Handler: httpserver.NewHTTPServer(resources.IndexHTML)}
	go func() {
		err := server.ListenAndServe()
		if err != nil && err != http.ErrServerClosed{
			log.Fatal(err)
		}
	}()

	destHtmlFile, err := os.OpenFile(filepath.Join(distDir, "index.html"), os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer destHtmlFile.Close()
	(&Prerenderer{}).Render("http://localhost:8000", destHtmlFile)

	destHtmlFile, err = os.OpenFile(filepath.Join(distDir, "pricing"), os.O_WRONLY|os.O_CREATE, 0644)
	if err != nil {
		log.Fatal(err)
	}
	defer destHtmlFile.Close()
	(&Prerenderer{}).Render("http://localhost:8000/pricing", destHtmlFile)

	server.Shutdown(context.Background())
}
