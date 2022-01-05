package devserver

import (
	"log"
	"net/http"
	"sync/atomic"
	"time"
)
import "github.com/gorilla/websocket"

var upgrader = websocket.Upgrader{}

var wsId = int32(0)

func (srv *GreenJsServer) HandleWS(rw http.ResponseWriter, req *http.Request) {
	log.Println("Got websocket connection")
	ws, err := upgrader.Upgrade(rw, req, nil)
	if err != nil {
		log.Println("Could not handle websocket request:", err)
		return
	}
	defer ws.Close()

	protoState := struct{
		ReloadMode string `json:"reloadMode,omitempty"`
		LastChange time.Time `json:"lastChange,omitempty"`
	}{}

	ourId := atomic.AddInt32(&wsId, 1)
	srv.fileChangeListeners.Store(ourId, func() {
		log.Print("New change detected")
		protoState.LastChange = time.Now()
		ws.WriteJSON(&protoState)
	})

	defer func() {
		srv.fileChangeListeners.Delete(ourId)
	}()

	for {
		err := ws.ReadJSON(&protoState)
		if err != nil {
			log.Println(err)
			return
		}
	}
}