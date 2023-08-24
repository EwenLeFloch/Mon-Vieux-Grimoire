const booksModel = require("../models/books.model");
const ObjectId = require("mongoose").Types.ObjectId;

// To post a book
module.exports.createBook = (req, res, next) => {
	delete req.body._id;
	const book = new Book({ ...req.body });
	book.save()
		.then(() => res.status(201).json({ message: "Objet enregistré !" }))
		.catch((error) => next(error));
};

// To show all books
module.exports.allBooks = (req, res, next) => {
	booksModel.find((err, docs) => {
		if (!err) {
			return res.status(200).send(docs);
		} else {
			next(err);
		}
	});
};

// To show one particular book
module.exports.oneBook = (req, res, next) => {
	if (!ObjectId.isValid(req.params.id)) {
		return res.status(400).send("ID incorrect : " + req.params.id);
	}
	booksModel.findById(req.params.id, (err, docs) => {
		if (!err && docs != null) {
			return res.status(200).send(docs);
		} else if (!err && docs == null) {
			return res.redirect("/");
		} else {
			next(err);
		}
	});
};
