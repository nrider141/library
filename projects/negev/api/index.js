const express = require('express');
const Books = require("../models/books");
const Borrowers = require("../models/borrowers");
const router = express.Router();
const Login = require("../models/login");


router.get('/', function (req, res) {
    res.render('/templates/index', { title: 'Library' });
})

router.post('/login', function (req, res) {
    var user = req.body.user;

    Login.find({
        "$and": [
            { email: user.email }
        ]
    }, function (err, loginUser) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        console.log(loginUser);
        res.json({ loginUser: loginUser[0] });
    });
});

router.get('/activeBorrowers', function (req, res) {

    Borrowers.find({}, function (err, borrowers) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ borrowers: borrowers });
    });
});

router.get('/lateBooks', function (req, res) {

    Books.find({
        "$and": [
            { 'copies': { "$elemMatch": { 'status': 'borrowed' } } },
            {
                "copies.borrowedDate": { $gt: new Date() + 30, }
            }
        ]
    }, function (err, books) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        console.log(books);
        res.json({ books: books });
    });
});

router.get('/getBorrowedBooks', function (req, res) {

    Books.find({ 'copies': { "$elemMatch": { 'status': 'borrowed' } } }, function (err, books) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ books: books });
    });
});

router.get('/books', function (req, res) {

    Books.find({}, function (err, books) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ books: books });
    });
});

router.get('/books/:title/:filter', function (req, res) {
    let searchText = req.params.title;
    let filter = req.params.filter;

    if (filter != "All") {

        Books.find({

            $and: [
                { 'copies': { "$elemMatch": { 'status': filter } } }, {
                    $or: [
                        { title: new RegExp(searchText) }, {
                            ISBN: new RegExp(searchText)
                        },
                        { 'authors': { "$elemMatch": { '$in': [new RegExp(searchText)] } } },
                        { 'copies': { "$elemMatch": { 'copyId': searchText } } }
                    ]
                }
            ]
        },
            function (err, books) {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.json({ books: books });
            });

    } else {

        Books.find({
            $or: [
                { title: new RegExp(searchText) }, {
                    ISBN: new RegExp(searchText)
                },
                { 'authors': { "$elemMatch": { '$in': [new RegExp(searchText)] } } },
                { 'copies': { "$elemMatch": { 'copyId': searchText } } }
            ]
        },
            function (err, books) {
                if (err) {
                    return res.status(500).json({ message: err.message });
                }
                res.json({ books: books });
            });
    }
});

router.get('/borrowers/:name', function (req, res) {
    let name = req.params.name;
    Borrowers.find({
        $or: [
            { name: new RegExp(name) },
            { ID: new RegExp(name) },
            { phone: new RegExp(name) },
            { email: new RegExp(name) }
        ]
    }, function (err, borrowers) {
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        res.json({ borrowers: borrowers });
    });
});

router.get('/bookcopy/:copyId', function (req, res) {
    let id = req.params.copyId;

    Books.find({ 'copies': { "$elemMatch": { 'copyId': id } } }, function (err, copies) {
        console.log(err);
        if (err) {
            return res.status(500).json({ message: err.message });
        }
        console.log(copies)
        res.json({ copies: copies });
    });
});

router.post('/books', function (req, res) {
    var book = req.body.book;
    console.log(book)
    Books.create(book, function (err, book) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.send({ message: "Book created" });
    });
});

router.post('/borrowers', function (req, res) {
    var borrower = req.body.data;
    console.log(borrower)
    Borrowers.create(borrower, function (err, book) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.send({ message: "borrower created" });
    });
});

router.put('/books/:id', function (req, res) {
    let id = req.params.id;
    let book = req.body;
    if (book && book._id !== id) {
        return res.status(500).json({ err: "could not update" });
    }
    Books.findByIdAndUpdate(id, book, function (err, book) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.send({ message: "Book updated" });
    });
});

router.put('/books', function (req, res) {

    let book = req.body.copy;
    console.log(book)

    Books.update({ _id: book._id }, book, function (err, book) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.send({ message: "Book updated" });
    });
});

router.delete('/books/:id', function (req, res) {
    let id = req.params.id;
    let book = req.body;
    if (book && book._id !== id) {
        return res.status(500).json({ err: "couldn't delete" });
    }
    Books.findByIdAndRemove(id, book, function (err, book) {
        if (err) {
            return res.status(500).json({ err: err.message });
        }
        res.send({ message: "Book removed!" });
    });
});

router.post('/borrowBook', function (req, res) {
    let data = req.body.data1;

    Borrowers.find({ ID: data.id }, function (err, borrower) {

        if (borrower.length > 0) {
            console.log(borrower.borrowedBooks)
            if (borrower[0].borrowedBooks.length <= 5) {

                Borrowers.update({ ID: data.id }, { $push: { borrowedBooks: data.copyId } }, function (err, book) {
                    if (err) {
                        return res.status(500).json({ err: err.message });
                    }
                    Books.update({ 'copies.copyId': data.copyId }, {
                        '$set': {
                            'copies.$.status': 'borrowed',
                            'copies.$.borrowedDate': new Date()

                        }
                    }, function (err) {

                        res.send({ message: "Book was successfully removed" });
                    })


                });

            }
        } else {
            return res.status(500).json({ err: "Sorry, this borrower wasn't found" });
        }
    })
});

router.post('/returnborrowBook', function (req, res) {
    let data = req.body.data1;

    Borrowers.update(
        { 'borrowedBooks': { "$elemMatch": { '$in': [data.copyId] } } }, { $pull: { borrowedBooks: data.copyId } }, function (err, book) {
            if (err) {
                return res.status(500).json({ err: err.message });
            }


            Books.update({ 'copies.copyId': data.copyId }, {
                '$set': {
                    'copies.$.status': 'Available',
                    'copies.$.lastBorrowed': new Date(),
                    'copies.$.borrowedDate': ""

                }
            }, function (err) {

                res.send({ message: "Book was successfully removed" });
            })
        });
});

module.exports = router;
