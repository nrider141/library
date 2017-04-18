const express = require('express');
const path = require('path');
const parser = require('body-parser');
const app = express();
const router = require('./api');
const index = require('./api/index');

app.use(parser.json());
app.use('/api', router);
require('./mdb');
require('./models');

app.use(express.static('/public'));

app.use('/', index);

app.listen(3000, function () {
    console.log("The server is running on port 3000!");
});
