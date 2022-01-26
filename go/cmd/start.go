package cmd

import (
	"flag"
	"fmt"
	"github.com/webappio/greenjs/go/config"
	"github.com/webappio/greenjs/go/devserver"
	"log"
	"net"
	"os"
)

func Start(args []string) {
	flags := flag.NewFlagSet(os.Args[0], flag.ExitOnError)

	var listenAddr string
	flags.StringVar(&listenAddr, "l", "", "the address to listen on (e.g., 0.0.0.0:8000)")
	flags.StringVar(&listenAddr, "listen-addr", "", "the address to listen on (e.g., 0.0.0.0:8000)")

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

	var listener net.Listener
	if listenAddr == "" {
		for i := 3000; i < 3010; i += 1 {
			listener, err = net.Listen("tcp", fmt.Sprintf("127.0.0.1:%v", i))
			if err == nil {
				break
			}
		}
		if listener == nil {
			log.Fatal("Could not find a free port to listen to")
		}
	} else {
		listener, err = net.Listen("tcp", listenAddr)
		if err != nil {
			log.Fatal(err)
		}
	}
	fmt.Println("Server is listening at http://"+listener.Addr().String())
	err = (&devserver.GreenJsServer{
		UpstreamHost: upstreamAddr,
		BuildOpts: &buildOpts,
		InjectDevSidebar: true,
	}).Serve(listener)
	if err != nil {
		log.Fatal(err)
	}
}
