var express = require('express');
var router = express.Router();
var db = require('../../model/books');

/* GET books listing. */
router.get('/', (req, res) => {
  db.getAllBooks((err, data) => {
    if (err) {
      res.json({ error: "Error!"});
    }
    else {
      res.json(data);
    }
  })
})

router.post('/', (req, res) => {
  var newBook = {
    _id: req.body.id,
    author: req.body.author,
    title: req.body.title,
    description: req.body.description,
    quantity: req.body.quantity,
    price: req.body.price,
  }
  db.addNewBook(newBook, (err, data) => {
    if (err) {
      res.json({ error: "Error!"});
    }
    else {
      res.json(data);
    }
  })
})

router.get('/:id', (req, res) => {
  var bookId = req.params.id;
  db.getBookById(bookId, (err, data) => {
    if (err) {
      res.json({ error: "Error!" });
    }
    else {
      res.json(data);
    }
  })
})

router.delete('/:id', (req, res) => {
  var bookId = req.params.id;
  db.deleteBookById(bookId, (err, data) => {
    if (err) {
      res.json({ error: "Error!" });
    }
    else {
      res.json(data);
    }
  })
})

router.put('/:id', (req,res) => {
  var bookId = req.params.id;
  var bookData = {};

for (var key in req.body) {
   if (key !== "_id") {
     bookData[key] = req.body[key];
   }
 }
  db.updateBookById(bookId, bookData, (err,data) => {
    if(err) {
      res.json({ error: "Error!" });
    }
    else {
      res.json(data);
    }
  })
})


module.exports = router;