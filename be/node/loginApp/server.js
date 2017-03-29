
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.json();


app.get('/', function (req, res) {
    res.redirect('/form.html');
});

app.get('/form.js', function(req, res) {
    res.sendFile(__dirname + '/client/' + req.url);
});

app.post('/login*', urlencodedParser,
    function(req, res) {
        var response = {
            username: req.body.username,
            password: req.body.password
        }

        if (response.username === 'user' && response.password === 'user') {
            res.send('/client/index.html');
        } else {

            var status = 401;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    })

app.get('/(*\.html|js/|images/)', function(req, res) {
    res.sendFile(__dirname + '/client/' + req.url);
    console.log(req.url);
});

app.post('/user_form', urlencodedParser,
    function(req, res) {
        var response = {
            first_name: req.body.first_name,
            lsat_name: req.body.last_name
        }
        res.send(response);
    })

var server = app.listen(8888, function() {
    var addr = server.address();
    console.log("Listening at http://%s:%s", addr.address, addr.port);
});