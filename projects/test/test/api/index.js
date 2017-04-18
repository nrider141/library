'use strict';

const express = require('express');
// const books = require('../../mock/books.json');
const Books = require("../models/books");
const router = express.Router();

router.get('/books', function(req, res) {
    Books.find({}, function (err, books) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({ books: books });
    });
});

router.get('/books/:title', function(req, res) {
    let title = req.params.title;
    Books.find({title: new RegExp(title)}, function (err, books) {
        if (err) {
            return res.status(500).json({message: err.message});
        }
        res.json({ books: books });
    });
});


router.post('/books', function(req, res) {
    var book = req.body;
    Books.create(book, function (err, book) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({message: "Book created"});
    });
    console.log("BBABABABA");
});

router.put('/books/:id', function(req, res) {
    let id = req.params.id;
    let book = req.body;
    if(book && book._id !== id) {
        return res.status(500).json({err: "could not update"});
    }
    Books.findByIdAndUpdate(id, book, function (err, book) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({message: "Book updated"});
    });
});

router.delete('/books/:id', function(req, res) {
    let id = req.params.id;
    let book = req.body;
    if(book && book._id !== id) {
        return res.status(500).json({err: "could not delete"});
    }
     Books.findByIdAndRemove(id, book, function (err, book) {
         if(err) {
            return res.status(500).json({err: err.message});
        }
        res.send({message: "Book removed!"}); 
     });
});

module.exports = router;
