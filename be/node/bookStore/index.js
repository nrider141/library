const express = require('express');
const app = express();
const bodyParser = require('body-parser');

Book = require('/models/book.js');


app.use(bodyParser.json());


function findBook(Book) {
    for (var i = 0; i < Book.length; i++) {
        for (var j = 0; j < Book.length; j++) {
            var author = Book.author[i];
            var qoute = Book.qoute[j];

            return {
                author,
                qoute
            };
        }
    }
}

var books = findBook();
var book1 = findBook.author;
var book1 = findBook.qoute;
console.log(Book);


//home page
app.get('/', function (req, res) {
    res.send('Please use /api/book');
});

//books api
app.get('/api/books', function (req, res) {
    Book.getBooks(function (err, books) {
    });
});

//books api by ID
app.get('/api/books/:_id', function (req, res) {
    Book.getBookById(req.params._id, function (err, book) {
    });
});

var server = app.listen(8888, function () {
    var addr = server.address();
    console.log("Listening at http://%s:%s", addr.address, addr.port);
});