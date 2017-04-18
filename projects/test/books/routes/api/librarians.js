const express = require('express');
const router = express.Router();
const db = require('../../model/librarians');



// function resMsg(res, msg) {
//     return function (err, data)  {
//         if (err) {
//             return res.json({ error: `problem to ${msg}` });
//         }
//         res.json(data);
//     };
// }


/* GET users listing. */
router.get('/', function (req, res) {
    db.getAllLibrarians(function (error, data) {
        if (error) {
            throw error;
        }
        res.json(data);
    });
});


// router.get('/', function(req, res){
//     db.getAllLibrarians(resMsg(res, "Get All Librarians"));
// });

router.post('/', function (req, res) {
    var newLibrarian = {
        // _id: req.body.id,
        ID: req.body.ID,
        name: { first: req.body.first, last: req.body.last },
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password
    };

    db.addLibrarian(newLibrarian, function (error, data) {
        if (error) {
            throw error;
        }
        res.json(data);
    });
});

router.delete('/:ID', function (req, res) {
    var librarianId = req.params.ID;
    db.deleteLibrarianById(librarianId, function (error, data) {
        if (error) {
            throw error;
        }
        res.json(data);
    })
});

router.get('/:ID', function (req, res) {
    var librarianId = req.params.ID;
    db.getLibrarianById(librarianId, function (error, data) {
        if (error) {
            throw error;
        }
        res.json(data);
    });
});

router.put('/:ID', function (req, res) {
    var librarianId = req.params.ID;
    var librarianData = {};
    for (var key in req.body) {
        if (key !== 'ID') {
            librarianData[key] = req.body[key];
        }
    }

    db.updateLibrarianById(librarianId, librarianData, function (error, data) {
        if (error) {
            throw error;
        }
        res.json(data);
    });
});
module.exports = router;
