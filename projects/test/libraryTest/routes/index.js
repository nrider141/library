var express = require('express');
var router = express.Router();
var db = require('../model/books');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/add-book', function (req, res, next) {
  db.getAllBooks((err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      // res.json(data);
      res.render('addBook', { data: data });
    }
  });
});



router.get('/login', function (req, res, next) {

  res.render('login');

});

module.exports = router;
