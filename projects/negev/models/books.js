var mongoose = require('mongoose');
var bookSchema = new mongoose.Schema({
	ISBN: String,
	authors: Array,
	title: String,
	description: String,
	copies: Array,
	price: Number,
	imgSrc: String
}, {
		versionKey: false
	});

var booksModel = mongoose.model('Book', bookSchema);

module.exports = booksModel;