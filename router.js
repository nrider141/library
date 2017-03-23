const fs = require('fs');
const url = require("url");
const events = require('events');

var fireDetector = new events.EventEmitter();

fireDetector.on('fire', function() {
    console.log('Alarm!');
});
fireDetector.on('fire', function() {
    console.log('Sprinklers!');
});
// Fire was detected
fireDetector.emit('fire');

const router = (function () {
    var patches = {
        '404': function (path, request, response) {
            setResponse("<h3>404 NOT FOUND THE PATH:     " + path + " </h3>", response);
        },
        'beer': function (path, request, response) {
            setResponse("<h3>FOUND THE PATH:     " + path + " </h3>", response);
        }

    };

    function push(pathname, callback) {
        if (patches[pathname]) {
            return;
        }

        patches[pathname] = callback;
    }

    function run(request, response) {

        var urlParts = url.parse(request.url);
        var pathname = urlParts.pathname;
        var body = '<html>' +
            '<head>' +
            '<meta http-equiv="Content-Type" content="text/html; ' +
            'charset=UTF-8" />' +
            '</head>' +
            '<body>' +
            '<div>Hello Start</div>' +
            '<p><a href="/hello">hello</a></p>' +
            '</body>' +
            '</html>';
        console.log('pathname = ', pathname);

        if (pathname === '/') {
            setResponse(body, response);
            return;
        }

        if (pathname[0] === '/') { // remove the leading '/' ---> V
            pathname = getPathWithoutRoot(pathname);
            return;
        }

        if (patches[pathname]) {
            patches[pathname](pathname, request, response);
            return;
        }


        var isExsits = false;
        fs.exists(pathname, function (exists) {
            isExsits = exists;
            var content = '' + pathname + ' ';
            content += exists ? "it's there" : "not there!";

            if (exists) {
                return setResponse(content, response, pathname);
            } else {
                return setResponse(content, response);
            }
            //return true
        });

        console.log(isExsits);

        if (!isExsits) {
            pathname += ".html";
            fs.exists(pathname, function (exists) {
                isExsits = exists;
                var content = '' + pathname + ' ';
                content += exists ? "this html there" : "the html not there!";

                if (exists) {
                    setResponse(content, response, pathname);
                } else {
                    setResponse(content, response);
                }

            });
        }
        console.log(isExsits);

        if (!isExsits) {
            patches['404'](pathname, request, response);
        }

        console.log(isExsits);

        function getPathWithoutRoot(path) {
            // array with delimeter then // remove first element and join back
            var t = path.split("/");
            t.splice(0, 1);
            var s = t.join("/");
            return s;
        }
    } //run

    function setResponse(content, response, pathname) {
        if (pathname) {
            fs.readFile("." + pathname, 'utf8', function (err, data) {
                if (err) {
                    return console.log(err);
                }
                content = data;
            });
        }

        response.writeHead(200, { "content-Type": "text/html" });
        response.write(content);
        return response.end();
    }



    return {
        push: push,
        run: run
    }

}());

module.exports = router;