package main

import (
	"fmt"
	"os"

	"github.com/evanw/esbuild/pkg/api"
)

func main() {
	result := api.Build(api.BuildOptions{
		EntryPoints: []string{"examples/hello-world-react/App.js"},
		Outdir:     "examples/hello-world-react/dist/bundles",
		Bundle:      true,
		Write:       true,
		Splitting:   true,
		Format:      api.FormatESModule,
		//MinifyIdentifiers: true,
		//MinifySyntax:      true,
		//MinifyWhitespace:  true,
		LogLevel: api.LogLevelInfo,
		Loader: map[string]api.Loader{
			".jsx": api.LoaderJSX,
			".js":  api.LoaderJSX,
		},
		Define: map[string]string{"window.DoHydrate": "false"},
		Watch: &api.WatchMode{
			OnRebuild: func(result api.BuildResult) {
				fmt.Println("rebuilt")
			},
		},
	})

	<-make(chan interface{})

	if len(result.Errors) > 0 {
		os.Exit(1)
	}
}
