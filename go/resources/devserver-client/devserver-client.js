import React from "react";
import ReactDOM from "react-dom";
import {useEffect, useState} from "react";

const DevserverSidebar = ({open, onClose}) => {
    let [wsError, setWsError] = useState("Cannot connect to dev server, is it running?");
    let [ws, setWs] = useState(null);
    let [protoState, setProtoState] = useState({
        reloadMode: localStorage.getItem("greenjs-dev-reloadMode") || "none",
    });
    const connect = () => {
        let scheme = document.location.protocol === "https:" ? "wss" : "ws";
        let websocket = new WebSocket(scheme + "://" + document.location.host + "/greenjs-dev-connection");
        websocket.onopen = e => {
            setWsError("");
        }
        websocket.onclose = e => {
            setWsError("Cannot connect to dev server, is it running?");
            setTimeout(() => connect(), 300);
        }
        websocket.onerror = e => {
            console.error(e);
            setWsError("Websocket error, is dev server running?");
            websocket.close();
        }
        websocket.onmessage = e => {
            let data = JSON.parse(e.data);
            setProtoState(x => ({...x, ...data}));
        }
        setWs(websocket);
    }
    useEffect(() => connect(), []);
    useEffect(() => {
        if(protoState.reloadMode) {
            localStorage.setItem("greenjs-dev-reloadMode", protoState.reloadMode);
        }
        if(ws) {
            ws.send(JSON.stringify(protoState));
        }
    }, [protoState]);
    let [knownChange, setKnownChange] = useState(protoState.lastChange);
    useEffect(() => {
        if(protoState.reloadMode === "whole-page") {
            if(knownChange !== protoState.lastChange) {
                document.location.reload();
            }
        } else {
            setKnownChange(protoState.lastChange);
        }
    }, [protoState]);


    return <div
        style={{
            width: open ? "180px" : "0px",
            overflowX: "hidden",
            zIndex: "99999",
            transition: "width 300ms ease-in-out",
            position: "fixed",
            right: "0",
            top: "0",
            height: "100vh",
            background: "#fafcfa",
        }}
        onBlur={() => onClose()}
    >
        <div style={{
            width: "178px",
            height: "100%",
            borderLeft: "2px solid #113118",
            boxSizing: "border-box",
            padding: "10px",
            display: "flex",
            flexDirection: "column",
        }}>
            {wsError
                ? <b>{wsError}</b>
                : <>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none"
                             stroke="#16a34a" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                             className="feather feather-feather">
                            <path d="M20.24 12.24a6 6 0 0 0-8.49-8.49L5 10.5V19h8.5z"/>
                            <line x1="16" y1="8" x2="2" y2="22"/>
                            <line x1="17.5" y1="15" x2="9" y2="15"/>
                        </svg>
                        <h1 style={{fontSize: "20px", fontWeight: "bold", marginLeft: "10px"}}>
                            GreenJS Dev Tools
                        </h1>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", marginTop: "1rem"}}>
                        <h5 style={{fontSize: "10px", fontWeight: "bold"}}>Auto reload mode</h5>
                        <select value={protoState.reloadMode || "none"} onChange={e => setProtoState(protoState => ({...protoState, reloadMode: e.target.value}))}>
                            <option value="none">None</option>
                            <option value="whole-page">Whole page for every change</option>
                        </select>
                    </div>
                </>}
        </div>
    </div>
}

const DevserverWidget = () => {
    let [sidebarOpen, setSidebarOpen] = React.useState(false);

    return <>
        <DevserverSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)}/>
        <div style={{
            width: "26px", height: "26px",
            position: "fixed",
            right: "10px", bottom: "50%",
            cursor: "pointer",
            zIndex: "100000",
        }} onClick={() => {
            setSidebarOpen(x => !x);
        }}>
            <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='24' height='24' stroke='currentColor' stroke-width='2' fill='none' stroke-linecap='round' stroke-linejoin='round' class='css-i6dzq1'%3E%3Cpolyline points='15 18 9 12 15 6'%3E%3C/polyline%3E%3C/svg%3E"
                style={{
                    transform: sidebarOpen ? "rotate(180deg)" : "none",
                    transition: "transform 300ms linear",
                }}
                alt=""/>
        </div>
    </>
}

ReactDOM.render(
    <DevserverWidget/>,
    document.getElementById("greenjs-client-element")
);