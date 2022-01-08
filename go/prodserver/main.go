package main

import (
	"encoding/json"
	"flag"
	"github.com/pkg/errors"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)
import "github.com/gin-gonic/gin"

//func hashForFileName(hashBytes []byte) string {
//	return base32.StdEncoding.EncodeToString(hashBytes)[:8]
//}
var HashedChunkPattern = regexp.MustCompile("^.*-[ABCDEFGHIJKLMNOPQRSTUVWXYZ234567]{8}\\.[^.]+$")

func cwdToDistFolder() error {
	dir, err := os.Getwd()
	if err != nil {
		return err
	}
	for i := 0; i < 100; i += 1 {
		if _, err := os.Stat(filepath.Join(dir, "dist")); err == nil {
			return os.Chdir(filepath.Join(dir, "dist"))
		} else if os.IsNotExist(err) {
			dir = filepath.Dir(dir)
		}
	}
	return errors.New("Could not find the 'dist' directory")
}

func immutableCacheHeaders(ginCtx *gin.Context) {
	ginCtx.Header("Cache-Control", "public, max-age=604800, immutable")
}

func regularCacheHeaders(ginCtx *gin.Context) {
	ginCtx.Header("Cache-Control", "max-age=30") //cache for 30s to avoid thundering herd
}

func routeHTMLCacheHeaders(ginCtx *gin.Context) {
	ginCtx.Header("Cache-Control", "max-age=43200") //cache for 12h - html will be resaturated as expected
}

func readRoutes() (map[string]interface{}, error) {
	routesList := []string{}
	file, err := os.Open("routes.json")
	if err != nil {
		if os.IsNotExist(err) {
			log.Println("routes.json is missing, this might make certain pages load slower")
			return map[string]interface{}{}, nil
		}
		return nil, err
	}
	defer file.Close()

	err = json.NewDecoder(file).Decode(&routesList)
	if err != nil {
		return nil, err
	}

	routes := map[string]interface{}{}
	for _, route := range routesList {
		routes[route] = true
	}
	return routes, nil
}

func main()  {
	log.Println("Starting production GreenJS server")
	err := cwdToDistFolder()
	if err != nil {
		log.Fatal(err)
	}

	flags := flag.NewFlagSet(os.Args[0], flag.ExitOnError)

	var listenAddr string
	flags.StringVar(&listenAddr, "l", "0.0.0.0:8000", "the address to listen on (e.g., 0.0.0.0:8000)")
	flags.StringVar(&listenAddr, "listen-addr", "0.0.0.0:8000", "the address to listen on (e.g., 0.0.0.0:8000)")

	flags.Parse(os.Args[1:])

	routes, err := readRoutes()

	engine := gin.Default()
	err = filepath.WalkDir(".", func(path string, d fs.DirEntry, err error) error {
		if path == "routes.json" {
			return nil
		}
		if path == "greenjs-server" {
			return nil
		}
		handler := func(c *gin.Context) {
			c.File(path)
		}
		if HashedChunkPattern.MatchString(d.Name()) {
			engine.GET(path, immutableCacheHeaders, handler)
			engine.HEAD(path, immutableCacheHeaders, handler)
		} else if _, isRoute := routes["/"+strings.TrimSuffix(path, ".html")]; isRoute &&  strings.HasSuffix(path, ".html") {
			engine.GET(strings.TrimSuffix(path, ".html"), routeHTMLCacheHeaders, handler)
			engine.HEAD(strings.TrimSuffix(path, ".html"), routeHTMLCacheHeaders, handler)
		} else {
			engine.GET(path, regularCacheHeaders, handler)
			engine.HEAD(path, regularCacheHeaders, handler)
		}
		return nil
	})
	if err != nil {
		log.Fatal(err)
	}
	log.Fatal(http.ListenAndServe(listenAddr, engine))
}