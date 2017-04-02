var mongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/blog';

mongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect. Error:', err);
    } else {
        var pageSize = 10;
        var pageNum = 0;
        var authors = db.collection('authors');

        db.collection('authors')

            // .find(/* query? */)
            // .skip(pageSize * pageNum).limit(pageSize)
            // .sort({ 'name.last': 1, 'name.first': 1 })
            // .toArray(function (err, docs) {
            //     console.log(docs);
            //     db.close();
            // }) 

            // .insertOne({ _id: 999, name: { first: 'Dan', last: 'Or' } },
            // function (err, result) {
            //     console.log(result);
            //     db.close();
            // });

            // .deleteOne({ _id: 777 },
            // function (err, result) {
            //     console.log(result);
            //     db.close();
            // });

            .updateOne({_id: 5},
            {$set: {'email': 'polo@home.it'}},
            function(err, result) {
                console.log(result);
                db.close();
            });

            
    }
});



