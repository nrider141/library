const mongoose = require('mongoose');

const db = {
    url: 'mongodb://localhost:27017/library',
    open: function () {
        if (mongoose.connection.readyState === 0) {
            mongoose.connect(this.url)
        }
    },
    close: function () {
        if (mongoose.connection.readyState === 1) {
            mongoose.disconnect()
        }
    }
}

module.exports =  db;