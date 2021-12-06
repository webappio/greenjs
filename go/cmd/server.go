package cmd

import (
	"context"
	"fmt"
	"github.com/evanw/esbuild/pkg/api"
	"github.com/pkg/errors"
	"github.com/webappio/greenjs/go/resources"
	"net"
	"net/http"
	"net/http/httputil"
	"net/url"
)

type GreenJsServer struct {
	UpstreamHost string
	BuildOpts *api.BuildOptions
	PageIsRoute func(string) bool

	server *http.Server

	buildServerHost string
	stopBuildServer func ()

	reverseProxy *httputil.ReverseProxy
}

func (srv *GreenJsServer) Serve(listener net.Listener) error {
	if srv.BuildOpts == nil {
		srv.BuildOpts = &DefaultBuildOptions
	}
	result, err := api.Serve(api.ServeOptions{
		Servedir: "dist",
	}, *srv.BuildOpts)
	if err != nil {
		return errors.Wrap(err, "could not start eslint server")
	}

	srv.buildServerHost = fmt.Sprintf("%v:%v", result.Host, result.Port)
	srv.stopBuildServer = result.Stop

	srv.reverseProxy = httputil.NewSingleHostReverseProxy(&url.URL{Scheme: "http", Host: srv.buildServerHost})

	if srv.UpstreamHost != "" {
		upstreamReverseProxy := httputil.NewSingleHostReverseProxy(&url.URL{Scheme: "http", Host: srv.UpstreamHost})
		srv.reverseProxy.ModifyResponse = func(response *http.Response) error {
			if response.StatusCode == http.StatusNotFound {
				return errNotFound
			}
			return nil
		}
		srv.reverseProxy.ErrorHandler = func(writer http.ResponseWriter, request *http.Request, err error) {
			if err == errNotFound {
				upstreamReverseProxy.ServeHTTP(writer, request)
				return
			}
			writer.Header().Set("Content-Type", "text/plain")
			writer.Header().Set("Content-Length", "5")
			writer.WriteHeader(http.StatusBadGateway)
			writer.Write([]byte("error")) //TODO make prettier
		}
	}

	server := http.Server{Handler: srv}
	done := make(chan interface{})
	defer close(done)
	go func() {
		err = server.Serve(listener)
		close(done)
	}()
	go func() {
		err = result.Wait()
		close(done)
	}()
	<-done
	srv.Stop()
	return err
}

func (srv *GreenJsServer) Stop() {
	if srv.stopBuildServer != nil {
		srv.stopBuildServer()
	}
	if srv.server != nil {
		srv.server.Shutdown(context.Background())
	}
}

func (srv *GreenJsServer) ServeHTTP(rw http.ResponseWriter, req *http.Request) {
	isIndex := req.URL.Path == "/"
	if srv.PageIsRoute != nil {
		isIndex = isIndex || srv.PageIsRoute(req.URL.Path)
	}
	if isIndex {
		rw.Header().Set("Content-Type", "text/html")
		rw.Write(resources.IndexHTML)
		return
	}
	req.Header.Set("X-Forwarded-Host", req.Host)
	req.Header.Set("X-Forwarded-Proto", req.Proto)
	srv.reverseProxy.ServeHTTP(rw, req)
}