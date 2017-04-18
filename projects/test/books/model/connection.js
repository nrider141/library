var mongoose = require('mongoose');
const url = 'mongodb://localhost:27017/bookstore';

var connection = {
    open: () => {
        if (mongoose.connection.readyState == 0) {
            mongoose.connect(url);
        }
    },
    close: () => {
        if (mongoose.connection.readyState == 1) {
            mongoose.disconnect();
        }
    }
};

module.exports = connection;