const Book = require("../models/books.models");

//To create a new book
exports.createBook = (req, res, next) => {
	delete req.body._id;
	const book = new Book({
		...req.body,
	});
	book.save()
		.then(() => res.status(201).json({ message: "Objet enregistre !" }))
		.catch((error) => res.status(400).json({ error }));
};

//To find one book
exports.getOneBook = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(404).json({ error }));
};

//To find all books
exports.getAllBooks = (req, res, next) => {
	Book.find()
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
};

//To modify a book
exports.modifyBook = (req, res, next) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet modifie !" }))
		.catch((error) => res.status(400).json({ error }));
};

//To delete a book
exports.deleteBook = (req, res, next) => {
	Book.deleteOne({ _id: req.params.id })
		.then((books) => res.status(200).json({ message: "Objet supprime !" }))
		.catch((error) => res.status(404).json({ error }));
};
