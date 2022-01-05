package resources

import (
	_ "embed"
)

//go:embed index.html
var IndexHTML []byte

//if this fails, go to devserver-client directory and npm run build
//go:embed devserver-client/dist/out.js
var DevserverClientContents []byte