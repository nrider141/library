var express = require('express');
var router = express.Router();
var mdb = require('../model/books.js');
// var db = require('../db');


router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get("/api/books", (req, res) => {
  mdb.getAllBooks(function (err, data) {
    res.json(data)
  });
});


router.get('/api/books/:bookId', (req, res) => {
  var bookId = parseInt(req.params.bookId);
  mdb.getBookById(bookId, (err, data) => {
    res.json(data)
  });

});


router.post('/api/books', (req, res) => {
  var newBook = {
    _id: parseInt(req.body.id),
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    price: req.body.price,
    quantity: req.body.quantity
  };

  mdb.addNewBook(newBook, (err, data) => {
    res.json(data)
  })
});



router.delete('/api/books/:bookId', (req, res) => {
  var bookId = parseInt(req.params.bookId);
  mdb.deleteBookById(bookId, (err, data) => {
    res.json(data);
  })

});


router.put('/api/books/:bookId', (req, res) => {

  var bookId = parseInt(req.params.bookId);
  var bookData = {};
  for (var key in req.body) {
    if (key !== undefined) {
      bookData[key] = req.body[key];
    }
  }
  mdb.updateBookById(bookId, bookData, (err, data) => {
    res.json(data);
  })

});

module.exports = router;
