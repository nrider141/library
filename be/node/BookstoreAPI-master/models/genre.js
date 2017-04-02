const mongoose = require('mongoose');

//genre schema
const genreSchema = mongoose.Schema({
    name: {
       type: String,
       required: true
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

const Genre = module.exports = mongoose.model('Genre', genreSchema);

//get genres
module.exports.getGenres = function (callback, limit) {
    Genre.find(callback).limit(limit);
}

//add genre
module.exports.addGenre = function (genre, callback) {
    Genre.create(genre, callback);
}

//update genre
module.exports.updateGenre = function (id, genre, options, callback) {
    const query = {
        _id: id
    };

    const update = {
        name: genre.name
    };

    Genre.findOneAndUpdate(query, update, options, callback);
}

//delete genre
module.exports.deleteGenre = function (id, callback) {
    const query = {
        _id: id
    };
    Genre.remove(query, callback);
}
