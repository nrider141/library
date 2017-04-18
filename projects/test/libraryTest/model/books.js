const mongoose = require('mongoose');
const db = require('./dbConnection');
const Schema = mongoose.Schema;
const bookSchema = new Schema(
    {
        ISBN: String,
        title: String,
        authors: [],
        genres: [],
        copies: [],
        price: Number,
    },
    { versionKey: false }
);

const books = mongoose.model("books", bookSchema);

function getAllBooks(cb) {
    db.open();
    books.find({}, "-_id", (err, data) => {
        cb(err, data);
        db.close();
    });
}

function getBookByISBN(ISBN, cb) {
    db.open();
    books.findOne({ ISBN: ISBN }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function addNewBook(newBook, cb) {
    db.open();
    new books(newBook).save((err, data) => {
        cb(err, data);
        db.close();
    });
}


function deleteBookByISBN(ISBN, cb) {
    db.open();
    books.deleteOne({ ISBN: ISBN }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function updateBookByISBN(ISBN, bookData, cb) {
    db.open();
    books.updateOne({ ISBN: ISBN }, { $set: bookData }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

module.exports = {
    getAllBooks,
    addNewBook,
    getBookByISBN,
    deleteBookByISBN,
    updateBookByISBN
}


