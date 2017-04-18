// var db = require('../db');

var mongoose = require('mongoose');
var url = 'mongodb://localhost:27017/library';

if (mongoose.connection.readyState == 0) {
    mongoose.connect(url);
}

var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var bookSchema = new Schema({
    _id: Number,
    ISBN: String,
    Title: String,
    Authors: Array,
    Genre: Array,
    Price: Number,
    Copies: [
        { CopyId: String },
        { Status: String },
        { LastBorrower: String },
        { BorrowedDate: Date }
    ]
}, {
        versionKey: false
    });

var books = mongoose.model("books", bookSchema);

function getAllBooks(cb) {
    books.find({}, cb);
}

function getBookById(bookId, cb) {
    // books.findOne({_id: bookId}, cb);
    books.findById(bookId, cb)
    // books.findOne({ _id: bookId }, cb);
}

function addNewBook(newBook, cb) {
    new books(newBook).save(cb);
}

function deleteBookById(bookId, cb) {
    books.findByIdAndRemove(bookId, cb);
    // books.deleteOne({ _id: bookId }, cb);
}

function updateBookById(bookId, bookData, cb) {
    books.findByIdAndUpdate(bookId, bookData, cb);
    // books.updateOne({ _id: bookId }, { $set: bookData }, cb);
}

module.exports = {
    getAllBooks: getAllBooks,
    getBookById: getBookById,
    addNewBook: addNewBook,
    deleteBookById: deleteBookById,
    updateBookById: updateBookById
}