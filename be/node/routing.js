const http = require("http");
const hostname = 'localhost';
const port = 8889;



var Router = require('./router.js');






function test() {
    console.log("push");
    Router.push("tree", function (pathname, request, response) {
        console.warn("WOW");
        response.writeHead(200, { "content-Type": "text/html" });
        response.write("<p>DFSDFDS</p>");
        response.end();
    });
}

// function onRequest(request, response) {
//     console.log("before run");
//     Router.run(request, response);

// }


test();
http.createServer(Router.run).listen(port, hostname);
console.log("Server has started.");