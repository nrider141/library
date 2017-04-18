const mongoose = require('mongoose');
const db = require('./dbConnection');
const Schema = mongoose.Schema;
const borrowerSchema = new Schema({
    ID: String,
    name: { first: String, last: String },
    email: String,
    phone: String,
    address: String,
    borrowedBooks: []
},
    { versionKey: false }
);

const borrower = mongoose.model("borrower", borrowerSchema);

function getAllBorrower(cb) {
    db.open();
    borrower.find({}, "-_id", (err, data) => {
        cb(err, data);
        db.close();
    });
}

function getBorrowerByID(ID, cb) {
    db.open();
    borrower.findOne({ ID: ID }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function addNewBorrower(newBorrower, cb) {
    db.open();
    new borrower(newBorrower).save((err, data) => {
        cb(err, data);
        db.close();
    });
}


function deleteBorrowerByID(ID, cb) {
    db.open();
    borrower.deleteOne({ ID: ID }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

function updateBorrowerByID(ID, borrowerData, cb) {
    db.open();
    borrower.updateOne({ ID: ID }, { $set: borrowerData }, (err, data) => {
        cb(err, data);
        db.close();
    });
}

module.exports = {
    getAllBorrower,
    getBorrowerByID,
    addNewBorrower,
    deleteBorrowerByID,
    updateBorrowerByID
}


