"use strict"

const Books = require("./models/books");


var testBooks = [{
    ISBN: "ad4-F",
	authors: ["Kippi"],
	title: "Jungle Book",
    description: "fun",
	copies: ["hop", "dop"],
	price: 12
},
{
    ISBN: "gh574-F",
	authors: ["Dudi"],
	title: "Little Prince",
    description: "brave",
	copies: ["aaa", "bbbb"],
	price: 33
}
];

testBooks.forEach(function (todo, index) {
    Books.find({}, function (err, testBooks) {
        if(!err && !testBooks.length) {
            Books.create(todo);
        }
    })
});