
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

var urlencodedParser = bodyParser.json();


// app.get('/', function (req, res) {
//     res.redirect('/form.html');
// });

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/public/form.html');
});

app.get('/form.js', function(req, res) {
    res.sendFile(__dirname + '/public/' + req.url);
});

app.post('/login*', urlencodedParser,
    function(req, res) {
        var response = {

            username: req.body.username,
            password: req.body.password
        }

        if (response.username === 'user' && response.password === 'user') {
            res.send('/public/index.html');
        } else {

            var status = 401;
            res.status(status).end(http.STATUS_CODES[status]);
        }
    })

app.get('/(*\.html|js/|images/)', function(req, res) {
    res.sendFile(__dirname + '/public/' + req.url);
    console.log(req.url);
});

app.post('/user_form', urlencodedParser,
    function(req, res) {
        var response = {
            username: req.body.username,
            password: req.body.password
        }
        res.send(response);
    })

var server = app.listen(8989, function() {
    var addr = server.address();
    console.log("Listening at http://%s:%s", addr.address, addr.port);
});