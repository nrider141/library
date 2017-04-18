'use strict';

const express = require('express');
const parser = require('body-parser');
const router = require('./api');
const app = express();

app.use(parser.json());
app.use('/api', router);
require("./database");
// require("./seed");

app.use(express.static('public'));


app.listen(3000, function() {
    console.log("The server is running on port 3000!");
});
