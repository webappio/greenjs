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
	stopped bool

	reverseProxy *httputil.ReverseProxy
}

func (srv *GreenJsServer) Serve(listener net.Listener) error {
	result, err := api.Serve(api.ServeOptions{
		Servedir: srv.BuildOpts.Outdir,
	}, *srv.BuildOpts)
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
	srv.reverseProxy.ErrorHandler = func(rw http.ResponseWriter, request *http.Request, err error) {
		if err == errNotFound {
			if upstreamReverseProxy != nil {
				upstreamReverseProxy.ServeHTTP(rw, request)
			} else {
				rw.Header().Set("Content-Type", "text/html")
				rw.Write(resources.IndexHTML)
			}
			return
		}
		rw.Header().Set("Content-Type", "text/plain")
		rw.Header().Set("Content-Length", "5")
		rw.WriteHeader(http.StatusBadGateway)
		rw.Write([]byte("error")) //TODO make prettier
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