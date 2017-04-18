var express = require('express');
var router = express.Router();
const db = require('../model/books');


//bob is good
/* GET home page. */
router.get('/', function(req, res, next) {
  db.getAllBooks(function(error, data){
    if(error){
      throw error
    }
    res.render('index', { test: data });
  });
});

module.exports = router;
