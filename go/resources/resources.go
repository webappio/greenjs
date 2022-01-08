package resources

import (
	_ "embed"
)

//go:embed index.html
var IndexHTML []byte

//if this fails, go to devserver-client directory and npm run build
//go:embed devserver-client/dist/out.js
var DevserverClientContents []byte

//if this fails, run:
//  ( cd ../prodserver/; GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -tags netgo -ldflags '-w' -o ../resources/prod-server ./main.go; )
//go:embed prod-server
var ProdServer []byte
