const Books = require("./models/books");
const Borrowers = require("./models/borrowers");
const Login = require("./models/login");


var mockBooks = [{
	ISBN: "978-1-60309-2395",
	authors: ["James Kochalka"],
	title: "American Elf 1999",
	description: "Welcome to the digital edition of James Kochalka's award-winning, influential, and totally addictive autobiography, American Elf!",
	copies: [
		{
			copyId: "ae1",
			status: "Available",
			lastBorrowed: "",
			borrowedDate: Date.now()
		},
		{
			copyId: "ae2",
			status: "Available",
			lastBorrowed: "",
			borrowedDate: Date.now()
		}],
	price: 2.99,
	imgSrc: "http://www.topshelfcomix.com/catalog/covers/americanelf1999_lg.jpg"
}];

var mockBorrowers = [
	{
		ID: "300626777",
		name: "Negev Rider",
		borrowedBooks: ["American Elf 1999"]
	}
];

var mockLogin = [
	{
		email: "admin@gmail.com",
		password: "admin"

	},
	{
		email: "tech@gmail.com",
		password: "tech"

	},
	{
		email: "librarian@gmail.com",
		password: "librarian"

	}];

mockLogin.forEach(function (loginData, index) {
	Login.find({}, function (err, mockBorrowers) {
		if (!err && !mockBorrowers.length) {
			login.create(loginData);
		}
	});
});

mockBorrowers.forEach(function (borrower, index) {
	Borrowers.find({}, function (err, mockBorrowers) {
		if (!err && !mockBorrowers.length) {
			Borrowers.create(borrower);
		}
	});
});

mockBooks.forEach(function (book, index) {
	Books.find({}, function (err, mockBooks) {
		if (!err && !mockBooks.length) {
			Books.create(book);
		}
	});
});