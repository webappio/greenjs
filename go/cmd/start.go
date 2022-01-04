package cmd

import (
	"flag"
	"github.com/pkg/errors"
	"github.com/webappio/greenjs/go/config"
	"log"
	"net"
	"os"
)

var errNotFound = errors.New("not found")

func Start(args []string) {
	flags := flag.NewFlagSet(os.Args[0], flag.ExitOnError)

	var listenAddr string
	flags.StringVar(&listenAddr, "l", "127.0.0.1:8000", "the address to listen on (e.g., 0.0.0.0:8000)")
	flags.StringVar(&listenAddr, "listen-addr", "127.0.0.1:8000", "the address to listen on (e.g., 0.0.0.0:8000)")

	var upstreamAddr string
	flags.StringVar(&upstreamAddr, "u", "", "the upstream server to forward requests to (e.g., localhost:8080)")
	flags.StringVar(&upstreamAddr, "upstream-addr", "", "the upstream server to forward requests to (e.g., localhost:8080)")
	flags.Parse(args)

	conf := config.Defaults()
	err := conf.Read("greenjs.json")
	if err != nil {
		log.Fatal(err)
	}
	buildOpts, err := conf.ToBuildOptions(false)
	if err != nil {
		log.Fatal(err)
	}

	listener, err := net.Listen("tcp", listenAddr)
	if err != nil {
		log.Fatal(err)
	}
	log.Println("Server is listening at ", listenAddr)
	err = (&GreenJsServer{
		UpstreamHost: upstreamAddr,
		BuildOpts: &buildOpts,
	}).Serve(listener)
	if err != nil {
		log.Fatal(err)
	}
}
