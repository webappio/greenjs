package main

import (
	"flag"
	"fmt"
	"github.com/webappio/greenjs/go/cmd"
	"os"
)

func printUsage() {
	fmt.Fprintf(os.Stderr, "usage: %v [build|start|genconfig]\n", os.Args[0])
	os.Exit(1)
}

func main() {
	flags := flag.NewFlagSet(os.Args[0], flag.ContinueOnError)
	flags.Usage = printUsage
	flags.Parse(os.Args[1:])
	if flags.NArg() < 1 {
		printUsage()
	}
	switch flags.Arg(0) {
	case "build":
		cmd.Build(flags.Args()[1:])
	case "genconfig":
		cmd.Genconfig(flags.Args()[1:])
	case "start":
		cmd.Start(flags.Args()[1:])
	default:
		printUsage()
	}
}
