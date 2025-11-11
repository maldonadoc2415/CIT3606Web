// include the http module
var http = require('http');

// create an http server object
http.createServer(function (req, res) {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello World\n');// server response
    }).listen(8080);// the server listens on port 8080

