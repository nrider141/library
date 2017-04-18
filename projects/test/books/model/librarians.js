const mongoose = require('mongoose');
const connection = require('./connection')
const url = 'mongodb://localhost:27017/bookstore';


connection.open();

// if(mongoose.connection.readyState == 0){
// 	mongoose.connect(url);
// }

var Schema = mongoose.Schema;
// ObjectId = Schema.ObjectId;

var librarianSchema = new Schema({
    ID: Number,
    name: { first: String, last: String },
    email: String,
    phone: Number,
    password: String
}, {
        versionKey: false
    });

var librarians = mongoose.model("librarians", librarianSchema);

function getAllLibrarians(cb) {
    librarians.find({}, { _id: 0 }, cb);
}

function addLibrarian(librarian, callback) {
    new librarians(librarian).save(callback);
}

function getLibrarianById(librarianId, callback) {
    librarians.findOne({ ID: librarianId }, { _id: 0 }, callback);
}

function deleteLibrarianById(librarianId, callback) {
    librarians.findOneAndRemove(librarianId, callback);
}

function updateLibrarianById(librarianId, librarianData, callback) {
    librarians.findOneAndUpdate(librarianId, { $set: librarianData }, callback)

}



module.exports = {
    getAllLibrarians,
    addLibrarian,
    getLibrarianById,
    deleteLibrarianById,
    updateLibrarianById
}



