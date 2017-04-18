const mongoose = require('mongoose');
const db = require('./dbConnection');
const Schema = mongoose.Schema;
const librarianSchema = new Schema({
    ID: String,
    name: { first: String, last: String },
    email: String,
    phone: String,
    password: String,
},
    { versionKey: false }
);

const librarian = mongoose.model("librarian", librarianSchema);

function getAllLibrarian(cb) {
    db.open();
    librarian.find({}, "-_id", (err, data) => {
        cb(err, data);
        db.close();
    });
}

function getLibrarianByID(ID, cb) {
    db.open();
    librarian.findOne({ ID: ID }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function addNewLibrarian(newLibrarian, cb) {
    db.open();
    new librarian(newLibrarian).save((err, data) => {
        cb(err, data);
        db.close();
    });
}


function deleteLibrarianByID(ID, cb) {
    db.open();
    librarian.deleteOne({ ID: ID }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function updateLibrarianByID(ID, LibrarianData, cb) {
    db.open();
    librarian.updateOne({ ID: ID }, { $set: LibrarianData }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

module.exports = {
    getAllLibrarian,
    getLibrarianByID,
    addNewLibrarian,
    deleteLibrarianByID,
    updateLibrarianByID
}


