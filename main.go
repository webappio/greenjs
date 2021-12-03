package main

import (
	"flag"
	"fmt"
	"github.com/webappio/greenjs/go/cmd"
	"os"
)

func printUsage() {
	fmt.Fprintf(os.Stderr, "usage: %v [build|start]\n", os.Args[0])
	os.Exit(1)
}

func main() {
	flag.Parse()
	if len(os.Args) < 2 {
		printUsage()
	}

	switch os.Args[1] {
	case "build":
		cmd.Build()
	case "start":
		cmd.Start()
	default:
		printUsage()
	}
}
