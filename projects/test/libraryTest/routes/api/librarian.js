var express = require('express');
var router = express.Router();
var db = require('../../model/librarian');


/* GET users listing. */
router.get('/', (req, res) => {
  db.getAllLibrarian((err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.post('/', (req, res) => {
  var newLibrarian = {
    ID: req.body.ID,
    name: { first: req.body.name.first, last: req.body.name.last },
    email: req.body.email,
    phone: req.body.phone,
    password: req.body.password,

  };

  db.addNewLibrarian(newLibrarian, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});


router.get('/:librarian', (req, res) => {
  var librarian = req.params.librarian;

  db.getLibrarianByID(librarian, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.delete('/:librarian', (req, res) => {
  var librarian = req.params.librarian;
  db.deleteLibrarianByID(librarian, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.put('/:librarian', (req, res) => {
  var librarian = req.params.librarian;
  var bookData = {};
  for (var key in req.body) {

    bookData[key] = req.body[key];

  }
  db.updateLibrarianByID(librarian, bookData, (err, data) => {
    res.json(data);
  })

});

module.exports = router;



