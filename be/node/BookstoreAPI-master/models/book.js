const library = require('mongoose');

//book schema
const bookSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    author: {
        type: String,
        required: true
    },
    publisher: {
        type: String,
        required: true
    },
    pages: {
        type: String,
    },
    image_url: {
        type: String,
        required: true
    },
    buy_url: {
        type: String,
        required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Book = module.exports = mongoose.model('Book', bookSchema);

//get books
module.exports.getBooks = function (callback, limit) {
    Book.find(callback).limit(limit);
}

//get book by ID
module.exports.getBookById = function (id, callback) {
    Book.findById(id, callback);
}

//add book
module.exports.addBook = function (book, callback) {
    Book.create(book, callback);
}

//update book
module.exports.updateBook = function (id, book, options, callback) {
    const query = {
        _id: id
    };

    const update = {
        title: book.title,
        genre: book.genre,
        description: book.description,
        author: book.author,
        publisher: book.publisher,
        pages: book.pages,
        image_url: book.image_url,
        buy_url: book.buy_url
    };

    Book.findOneAndUpdate(query, update, options, callback);
}

//delete book
module.exports.deleteBook = function (id, callback) {
    const query = {
        _id: id
    };
    Book.remove(query, callback);
}
