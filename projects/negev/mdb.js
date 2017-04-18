const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/library',
    function (err) {
        // console.log(err)
        if (err) {
            console.log("Failed connecting to mongoDB");
        }
        else {
            console.log("mongoDB up and running");
        }
    }
);