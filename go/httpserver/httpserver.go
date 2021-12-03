package httpserver

import (
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"strings"
)

func NewHTTPServer(indexHTML []byte) http.Handler {
	//TODO handle 404s
	mux := http.NewServeMux()
	mux.HandleFunc("/bundles/", func(writer http.ResponseWriter, request *http.Request) {
		base := "dist"
		path := filepath.Clean(base + request.URL.Path)
		if !strings.HasPrefix(path, base+"/bundles/") {
			writer.WriteHeader(http.StatusBadRequest)
			writer.Write([]byte("error: " + "bad path: " + request.URL.Path))
			return
		}

		stat, err := os.Stat(path)
		if err != nil {
			writer.WriteHeader(http.StatusNotFound)
			writer.Write([]byte("error: " + err.Error()))
			return
		}

		f, err := os.Open(path)
		if err != nil {
			writer.WriteHeader(http.StatusInternalServerError)
			writer.Write([]byte("error: " + err.Error()))
			return
		}
		defer f.Close()

		writer.Header().Set("Content-Type", "text/javascript")
		writer.Header().Set("Content-Length", fmt.Sprint(stat.Size()))
		io.Copy(writer, f)
	})
	mux.HandleFunc("/", func(writer http.ResponseWriter, request *http.Request) {
		writer.WriteHeader(http.StatusOK)
		writer.Write(indexHTML)
	})
	return mux
}