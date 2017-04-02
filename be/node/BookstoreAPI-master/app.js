const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());

Genre = require('./models/genre');
Book = require('./models/book');

// connect mongoose
mongoose.connect('mongodb://localhost/bookstore');
const db = mongoose.connection;

//home page
app.get('/', function (req, res) {
    res.send('Please use /api/book or /api/genres.');
});

//genres api
app.get('/api/genres', function (req, res) {
    Genre.getGenres(function (err, genres) {
       if (err) { throw err; }
       res.json(genres);
    });
});

//add genre via api
app.post('/api/genres', function (req, res) {
    const genre = req.body;
    Genre.addGenre(genre, function (err, genre) {
        if (err) { throw err; }
        res.json(genre);
    });
});

//update genre via api
app.put('/api/genres/:_id', function (req, res) {
    const id = req.params._id;
    const genre = req.body;
    Genre.updateGenre(id, genre, {}, function (err, genre) {
        if (err) { throw err; }
        res.json(genre);
    });
});

//delete genre via api
app.delete('/api/genres/:_id', function (req, res) {
    const id = req.params._id;
    Genre.deleteGenre(id, function (err, genre) {
        if (err) { throw err; }
        res.json(genre);
    });
});


//books api
app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
        if (err) { throw err; }
        res.json(books);
    });
});

//books api by ID
app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
        if (err) { throw err; }
        res.json(book);
    });
});

//add book via api
app.post('/api/books', function (req, res) {
    const book = req.body;
    Book.addBook(book, function (err, book) {
        if (err) { throw err; }
        res.json(book);
    });
});

//update book via api
app.put('/api/books/:_id', function (req, res) {
    const id = req.params._id;
    const book = req.body;
    Book.updateBook(id, book, {}, function (err, book) {
        if (err) { throw err; }
        res.json(book);
    });
});


//delete book via api
app.delete('/api/books/:_id', function (req, res) {
    const id = req.params._id;
    Book.deleteBook(id, function (err, book) {
        if (err) { throw err; }
        res.json(book);
    });
});


//
app.listen(4000);
console.log('running on port 4000');
