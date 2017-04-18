const express = require('express');
const path = require('path');
const parser = require('body-parser');
const app = express();
const router = require('./api');
const index = require('./api/index');
const mdb = require('./mdb');
const models = require('./models');
const favicon = require('static-favicon');
const logger = require('morgan');

app.use(parser.json());
app.use('/api', router);
app.use(express.static(path.join(__dirname, 'public')));

app.use(favicon());
app.use('/', index);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.locals.pretty = true;

app.use(logger('dev'));

app.listen(3000, function () {
    console.log("The server is running on port 3000!");
});

module.exports = app;