package cmd

import (
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/webappio/greenjs/go/httpserver"
	"github.com/webappio/greenjs/go/resources"
	"log"
	"net/http"
)

func Start() {
	go func() {
		log.Fatal(http.ListenAndServe(":8000", httpserver.NewHTTPServer(resources.IndexHTML)))
	}()

	result := api.Build(api.BuildOptions{
		EntryPoints: []string{"App.js"},
		Outdir:      "dist/bundles",
		Bundle:      true,
		Write:       true,
		Splitting:   true,
		Format:      api.FormatESModule,
		LogLevel: api.LogLevelInfo,
		Loader: map[string]api.Loader{
			".jsx": api.LoaderJSX,
			".js":  api.LoaderJSX,
		},
		Watch: &api.WatchMode{
			OnRebuild: func(result api.BuildResult) {
				fmt.Println("rebuilt")
			},
		},
	})
	for _, err := range result.Errors {
		log.Println(err.Text)
		log.Println(err.Location.File, ":", err.Location.Line)
		log.Println(err.Detail)
		log.Println()
	}

	<-make(chan interface{})
}
