var http = require('http');
var hostname = 'localhost';
var port = 8888;
var router = require('.');

var runfunc = function start(response) {
    console.log("Request handler 'start' was called.");
    var body = '<html>' +
        '<head>' +
        '<meta http-equiv="Content-Type" content="text/html; ' +
        'charset=UTF-8" />' +
        '</head>' +
        '<body>' +
        '<div>Hello Start</div>' +
        '</body>' +
        '</html>';

    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(body);
}

http.createServer(runfunc);

runfunc.listen(port, hostname);