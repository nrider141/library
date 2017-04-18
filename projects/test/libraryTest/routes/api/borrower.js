var express = require('express');
var router = express.Router();
var db = require('../../model/borrower');


/* GET users listing. */
router.get('/', (req, res) => {
  db.getAllBorrower((err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.post('/', (req, res) => {
  var newBorrower = {
    ID: req.body.ID,
    name: { first: req.body.name.first, last: req.body.name.last },
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    borrowedBooks: req.body.borrowedBooks
  };

  db.addNewBorrower(newBorrower, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});


router.get('/:borrower', (req, res) => {
  var borrower = req.params.borrower;

  db.getBorrowerByID(borrower, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.delete('/:borrower', (req, res) => {
  var borrower = req.params.borrower;
  db.deleteBorrowerByID(borrower, (err, data) => {
    if (err) {
      res.json({ error: "we have problem to get all books" });
    }
    else {
      res.json(data);
    }
  });
});

router.put('/:borrower', (req, res) => {
  var borrower = req.params.borrower;
  var bookData = {};
  for (var key in req.body) {

    bookData[key] = req.body[key];

  }
  db.updateBorrowerByID(borrower, bookData, (err, data) => {
    res.json(data);
  })

});

module.exports = router;



