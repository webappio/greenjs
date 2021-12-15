package resources

import (
	_ "embed"
)

//go:embed index.html
var IndexHTML []byte

//go:embed 000_server.js
var ServerJS []byte