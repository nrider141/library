const mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/bookstore';


if(mongoose.connection.readyState == 0){
	mongoose.connect(url);
}

var Schema = mongoose.Schema;
	// ObjectId = Schema.ObjectId;

var bookSchema = new Schema({
	ISBN: String,
	title: String,
	author: String,
	genre: String,
	price: Number,
	quantity: Number
},{
	 versionKey: false
});

var books = mongoose.model("books", bookSchema);

function getAllBooks(cb) {
	books.find({}, cb);
}

function addBook(book, callback){
	new books(book).save(callback);
}

function getBookByISBN(bookISBN, callback) {
	books.findOne({ ISBN: bookISBN },{_id: 0}, callback);
}

function deleteBookByISBN(bookISBN, callback){
	books.findOneAndRemove(bookISBN, callback);
}

function updateBookByISBN(bookISBN, bookData, callback){
	books.findOneAndUpdate(bookISBN, {$set: bookData}, callback)

}



module.exports = {
	getAllBooks,
	addBook,
	getBookByISBN,
	deleteBookByISBN,
	updateBookByISBN
}
