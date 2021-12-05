package cmd

import "github.com/evanw/esbuild/pkg/api"

var DefaultBuildOptions = api.BuildOptions{
	EntryPoints: []string{"App.js"},
	Outdir:      "dist",
	Bundle:      true,
	Write:       true,
	Splitting:   true,
	Format:      api.FormatESModule,
	LogLevel:    api.LogLevelInfo,
	Loader: map[string]api.Loader{
		".jsx":  api.LoaderJSX,
		".js":   api.LoaderJSX,
		".svg":  api.LoaderFile,
		".png":  api.LoaderFile,
		".jpg":  api.LoaderFile,
		".jpeg": api.LoaderFile,
		".css":  api.LoaderCSS,
	},
}

