var mongoose = require('mongoose');
var borrowersSchema = new mongoose.Schema({
	ID: String,
	name: String,
	email: String,
	phone: String,
	address: String,
	borrowedBooks: Array
}, {
		versionKey: false
	});

var borrowersModel = mongoose.model('Borrower', borrowersSchema);

module.exports = borrowersModel;