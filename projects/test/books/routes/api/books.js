const express = require('express');
const router = express.Router();
const db = require('../../model/books');



/* GET users listing. */
router.get('/', function (req, res) {
  db.getAllBooks(function (error, data) {
    if (error) {
      throw error;
    }
    res.json(data);
  });
});


router.post('/', function (req, res) {
  var newBook = {
    // _id: req.body.id,
    ISBN: req.body.ISBN,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price
  }

  db.addBook(newBook, function (error, data) {
    if (error) {
      throw error;
    }
    res.json(data);
  });
});

router.delete('/:ISBN', function(req, res){
  var bookISBN = req.params.ISBN;
  db.deleteBookByISBN(bookISBN, function(error, data){
    if (error){
      throw error;
    }
    res.json(data);
  })
});

router.get('/:ISBN', function (req, res) {
  var bookISBN = req.params.ISBN;
  db.getBookByISBN(bookISBN, function(error, data){
    if(error){
      throw error;
    }
    res.json(data);
  });
});

router.put('/:ISBN', function(req, res){
  var bookISBN = req.params.ISBN;
  var bookData = {};
  for( var key in req.body){
    if(key !== '_id'){
      bookData[key] = req.body[key];
    }
  }

  db.updateBookByISBN(bookISBN, bookData, function(error, data){
    if(error){
      throw error;
    }
    res.json(data);
  });
});
module.exports = router;
