package devserver

import (
	"context"
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/fsnotify/fsnotify"
	"github.com/pkg/errors"
	"github.com/webappio/greenjs/go/findroutes"
	"github.com/webappio/greenjs/go/resources"
	"io/fs"
	"log"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
	"path/filepath"
	"strings"
	"sync"
)

var errNotFound = errors.New("not found")

type GreenJsServer struct {
	UpstreamHost string
	BuildOpts *api.BuildOptions
	InjectDevSidebar bool

	routes []string
	fileChangeListeners sync.Map

	server *http.Server

	buildServerHost string
	stopBuildServer func ()
	stopped bool

	errMessagesMutex sync.Mutex
	errMessages []api.Message

	reverseProxy *httputil.ReverseProxy
}

func (srv *GreenJsServer) ServeBasicHTML(rw http.ResponseWriter, req *http.Request){
	devScript := ""
	if srv.InjectDevSidebar {
		devScript = `<div id="greenjs-client-element"></div><script src="/greenjs-devserver-client.js" type="module"></script>`
	}
	rw.Header().Set("Content-Type", "text/html")
	rw.Write([]byte(strings.NewReplacer(
		"<!-- dev script-->", devScript,
		"App.js", srv.BuildOpts.EntryPoints[0],
	).Replace(string(resources.IndexHTML))))
}

func (srv *GreenJsServer) Serve(listener net.Listener) error {
	opts := *srv.BuildOpts

	opts.Plugins = append(opts.Plugins, api.Plugin{
		Name:  "server",
		Setup: func(build api.PluginBuild) {
			build.OnEnd(func(result *api.BuildResult) {
				srv.errMessagesMutex.Lock()
				srv.errMessages = result.Errors
				srv.errMessagesMutex.Unlock()
				go func() {
					srv.routes = findroutes.FindRoutesFromOutputFiles(result.OutputFiles)
				}()
			})
		},
	})

	result, err := api.Serve(api.ServeOptions{
		Servedir: opts.Outdir,
	}, opts)
	if err != nil {
		return errors.Wrap(err, "could not start eslint server")
	}

	srv.buildServerHost = fmt.Sprintf("%v:%v", result.Host, result.Port)
	srv.stopBuildServer = result.Stop

	srv.reverseProxy = httputil.NewSingleHostReverseProxy(&url.URL{Scheme: "http", Host: srv.buildServerHost})

	var upstreamReverseProxy *httputil.ReverseProxy
	if srv.UpstreamHost != "" {
		upstreamReverseProxy = httputil.NewSingleHostReverseProxy(&url.URL{Scheme: "http", Host: srv.UpstreamHost})
	}
	srv.reverseProxy.ModifyResponse = func(response *http.Response) error {
		if response.StatusCode == http.StatusNotFound {
			return errNotFound
		}
		return nil
	}
	srv.reverseProxy.ErrorHandler = func(rw http.ResponseWriter, req *http.Request, err error) {
		if err == errNotFound {
			if upstreamReverseProxy != nil {
				upstreamReverseProxy.ServeHTTP(rw, req)
			} else {
				srv.ServeBasicHTML(rw, req)
				return
			}
			return
		}
		rw.Header().Set("Content-Type", "text/plain")
		rw.Header().Set("Content-Length", "5")
		rw.WriteHeader(http.StatusBadGateway)
		rw.Write([]byte("error")) //TODO make prettier
	}

	watcher, err := fsnotify.NewWatcher()
	if err != nil {
		log.Fatal(err)
	}
	defer watcher.Close()
	go func() {
		for {
			select {
			case event, ok := <-watcher.Events:
				if !ok {
					return
				}
				if event.Op&fsnotify.Write == fsnotify.Write {
					srv.fileChangeListeners.Range(func(key, value interface{}) bool {
						value.(func())()
						return true
					})
				} else if event.Op&fsnotify.Create == fsnotify.Create {
					watcher.Add(event.Name)
				}
			case err, ok := <-watcher.Errors:
				if !ok {
					return
				}
				log.Println("error:", err)
			}
		}
	}()
	err = filepath.WalkDir(filepath.Dir(srv.BuildOpts.EntryPoints[0]), func(path string, d fs.DirEntry, err error) error {
		return watcher.Add(path)
	})
	if err != nil {
		log.Print(err)
	}

	server := http.Server{Handler: srv}
	err = server.Serve(listener)
	if srv.stopped {
		err = nil
	} else {
		srv.Stop()
	}
	return err
}

func (srv *GreenJsServer) Stop() {
	srv.stopped = true
	if srv.stopBuildServer != nil {
		srv.stopBuildServer()
	}
	if srv.server != nil {
		srv.server.Shutdown(context.Background())
	}
}

func routeMatches(pattern, path string) bool {
	if !strings.HasPrefix(path, "/") {
		path = "/" + path
	}

	pathSplit := strings.Split(path, "/")
	routeSplit := strings.Split(path, "/")

	for i := 0; i < len(routeSplit); i += 1 {
		if strings.HasPrefix(routeSplit[i], ":"){
			continue
		}
		if strings.HasPrefix(routeSplit[i], "*") {
			return true
		}
		if i > len(pathSplit) || pathSplit[i] != routeSplit[i] {
			return false
		}
	}
	return len(routeSplit) == len(pathSplit)
}

func (srv *GreenJsServer) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	if req.URL.Path == "/greenjs-dev-connection" {
		srv.HandleWS(rw, req)
		return
	}
	if req.URL.Path == "/greenjs-devserver-client.js" {
		rw.Header().Set("Content-Type", "text/javascript")
		res := api.Build(api.BuildOptions{
			Write: false,
			Bundle: true,
			MinifySyntax: true,
			MinifyWhitespace: true,
			Stdin: &api.StdinOptions{
				Contents:   string(resources.DevserverClientContents),
				Loader: api.LoaderJSX,
			},
		})
		for _, err := range res.Errors {
			log.Println(err.Text)
			log.Println(err.Notes)
		}
		if len(res.OutputFiles) == 1 {
			rw.Write(res.OutputFiles[0].Contents)
		}
		return
	}
	serveBasicHTML := req.URL.Path == "/"
	for _, route := range srv.routes {
		if routeMatches(route, req.URL.Path) {
			serveBasicHTML = true
			break
		}
	}

	if serveBasicHTML {
		hasErrors := false
		srv.errMessagesMutex.Lock()
		hasErrors = len(srv.errMessages) > 0
		srv.errMessagesMutex.Unlock()
		if !hasErrors {
			srv.ServeBasicHTML(rw, req)
			return
		}
	}

	req.Header.Set("X-Forwarded-Host", req.Host)
	req.Header.Set("X-Forwarded-Proto", req.Proto)
	srv.reverseProxy.ServeHTTP(rw, req)
}