const http = require('http');
const fs = require('fs');

const routesList = JSON.parse(fs.readFileSync("routes.json", {encoding: "utf8", flag: "r"}));

const routeHandlers = {};
for(let route of routesList) {
  routeHandlers[route] = (req, res) => {
    let path = req.url;
    if(path === "/") {
      path = "/index";
    }
    fs.readFile(__dirname + path + ".html", function (err,data) {
      if (err) {
        res.writeHead(404);
        res.end(JSON.stringify(err));
        return;
      }
      res.setHeader("Content-Type", "text/html");
      res.writeHead(200);
      res.end(data);
    });
  }
}

http.createServer(function (req, res) {
  if(routeHandlers[req.url]) {
    routeHandlers[req.url](req, res);
    return;
  }
  fs.readFile(__dirname + req.url, function (err,data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    if(req.url.endsWith(".js")) {
      res.setHeader("Content-Type", "application/javascript");
    } else if (req.url.endsWith(".svg")) {
      res.setHeader("Content-Type", "image/svg+xml");
    } else if (req.url.endsWith(".css")) {
      res.setHeader("Content-Type", "text/css");
    } else {
      res.setHeader("Content-Type", "text/html");
    }
    res.writeHead(200);
    res.end(data);
  });
}).listen(8000);
