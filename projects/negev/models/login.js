var mongoose = require('mongoose');
var loginSchema = new mongoose.Schema({
	email: String,
	password: String,
}, {
		versionKey: false
	});

var loginModel = mongoose.model('login', loginSchema);

module.exports = loginModel;