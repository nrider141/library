var express = require('express');
var router = express.Router();
var db = require('../../model/books');



/* GET users listing. */
router.get('/', (req, res) => {
  db.getAllBooks((err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.post('/', (req, res) => {
  var newBook = {
    ISBN: req.body.ISBN,
    authors: req.body.authors,
    title: req.body.title,
    genres: req.body.genres,
    copies: req.body.copies,
    price: req.body.price
  };

  db.addNewBook(newBook, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});


router.get('/:bookISBN', (req, res) => {
  var ISBN = req.params.bookISBN;

  db.getBookByISBN(ISBN, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.delete('/:bookISBN', (req, res) => {
  var ISBN = req.params.bookISBN;
  db.deleteBookByISBN(ISBN, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.put('/:bookISBN', (req, res) => {
  var ISBN = req.params.bookISBN;
  var bookData = {};
  for (var key in req.body) {

    bookData[key] = req.body[key];

  }
  db.updateBookByISBN(ISBN, bookData, (err, data) => {
    res.json(data);
  })

});

module.exports = router;



