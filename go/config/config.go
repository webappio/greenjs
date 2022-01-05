package config

import (
	"encoding/json"
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/pkg/errors"
	"log"
	"os"
	"runtime"
	"strings"
)

type EnvironmentBoolean string

const (
	EnvironmentBooleanAlwaysTrue      EnvironmentBoolean = "true"
	EnvironmentBooleanAlwaysFalse     EnvironmentBoolean = "false"
	EnvironmentBooleanOnlyDevelopment EnvironmentBoolean = "only-dev"
	EnvironmentBooleanOnlyProduction  EnvironmentBoolean = "only-prod"
)

func (b EnvironmentBoolean) Evaluate(isDev bool) bool {
	switch b {
	case EnvironmentBooleanAlwaysTrue:
		return true
	case EnvironmentBooleanAlwaysFalse:
		return false
	case EnvironmentBooleanOnlyDevelopment:
		return isDev
	case EnvironmentBooleanOnlyProduction:
		return !isDev
	}
	log.Print("Invalid environment boolean: ", b)
	return false
}

type ESBuildConfig struct {
	EntryPointName   string             `json:"entry_point_name"`
	FileImportTypes  map[string]string  `json:"file_import_types"`
	OutDir           string             `json:"out_dir"`
	MinifyWhitespace EnvironmentBoolean `json:"minify_whitespace"`
	MinifySyntax     EnvironmentBoolean `json:"minify_syntax"`
}

type GreenJSConfig struct {
	ESBuildConfig ESBuildConfig `json:"esbuild"`
	ParallelTasks int32         `json:"parallel_tasks"`
}

func Defaults() GreenJSConfig {
	return GreenJSConfig{
		ParallelTasks: int32(runtime.NumCPU()),
		ESBuildConfig: ESBuildConfig{
			EntryPointName: "App.js",
			FileImportTypes: map[string]string{
				".jsx": "jsx",
				".js": "jsx",
				".tsx": "tsx",
				".ts": "tsx",
				".jpg": "file",
				".jpeg": "file",
				".png": "file",
				".svg": "file",
				".css": "css",
			},
			OutDir: "dist",
			MinifyWhitespace: EnvironmentBooleanOnlyProduction,
			MinifySyntax: EnvironmentBooleanOnlyProduction,
		},
	}
}

func (config *GreenJSConfig) Read(file string) error {
	f, err := os.Open(file)
	if err != nil {
		if os.IsNotExist(err) {
			return nil //config does not exist, use defaults
		}
		return err
	}
	defer f.Close()
	return errors.Wrapf(json.NewDecoder(f).Decode(config), "could not read config file at %v", file)
}

func (config *GreenJSConfig) ToBuildOptions(isDev bool) (api.BuildOptions, error) {
	opts := api.BuildOptions{
		Outdir:      "dist",
		EntryPoints: []string{config.ESBuildConfig.EntryPointName},
		Bundle:      true,
		Write:       true,
		Splitting:   true,
		Format:      api.FormatESModule,
		LogLevel:    api.LogLevelInfo,
		Define: map[string]string{
			"GreenJsHydrating": fmt.Sprint(isDev),
		},
		Loader: map[string]api.Loader{},
	}
	if config.ESBuildConfig.FileImportTypes != nil {
		for k, v := range config.ESBuildConfig.FileImportTypes {
			if !strings.HasPrefix(k, ".") {
				k = "." + k
			}
			switch v {
			case "jsx":
				opts.Loader[k] = api.LoaderJSX
			case "js":
				opts.Loader[k] = api.LoaderJS
			case "ts":
				opts.Loader[k] = api.LoaderTS
			case "tsx":
				opts.Loader[k] = api.LoaderTSX
			case "json":
				opts.Loader[k] = api.LoaderJSON
			case "text":
				opts.Loader[k] = api.LoaderText
			case "base64":
				opts.Loader[k] = api.LoaderBase64
			case "dataurl":
				opts.Loader[k] = api.LoaderDataURL
			case "file":
				opts.Loader[k] = api.LoaderFile
			case "binary":
				opts.Loader[k] = api.LoaderBinary
			case "css":
				opts.Loader[k] = api.LoaderCSS
			case "default":
				opts.Loader[k] = api.LoaderDefault
			default:
				return opts, fmt.Errorf("invalid loader type for %v: %v", k, v)
			}
		}
	}
	opts.MinifySyntax = config.ESBuildConfig.MinifySyntax.Evaluate(isDev)
	opts.MinifyWhitespace = config.ESBuildConfig.MinifyWhitespace.Evaluate(isDev)
	return opts, nil
}
