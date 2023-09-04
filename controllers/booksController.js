const Book = require("../models/Book");
const fs = require("fs");

//To create a new book
exports.createBook = (req, res, next) => {
	const bookObject = JSON.parse(req.body.book);
	delete bookObject._id;
	delete bookObject._userId;

	const book = new Book({
		...bookObject,
		userId: req.auth.userId,
		imageUrl: `${req.protocol}://${req.get("host")}/images/${
			req.file.filename
		}`,
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
	const bookObject = req.file
		? {
				...JSON.parse(req.body.book),
				imageUrl: `${req.protocol}://${req.get("host")}/images/${
					req.file.filename
				}`,
		  }
		: { ...req.body };
	delete bookObject._userId;
	Book.findOne({ _id: req.params.id })
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(401).json({ message: "Not authorized" });
			} else {
				Book.updateOne(
					{ _id: req.params.id },
					{ ...bookObject, _id: req.params.id }
				)
					.then(() =>
						res.status(200).json({ message: "Objet modifie !" })
					)
					.catch((error) => res.status(400).json({ error }));
			}
		})
		.catch((error) => res.status(400).json({ error }));
};

//To delete a book
exports.deleteBook = (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((book) => {
			if (book.userId != req.auth.userId) {
				res.status(401).json({ message: "Not authorized" });
			} else {
				const filename = book.imageURL.split("/images/")[1];
				fs.unlink(`images/${filename}`, () => {
					Book.deleteOne({ _id: req.params.id })
						.then((books) =>
							res
								.status(200)
								.json({ message: "Objet supprime !" })
						)
						.catch((error) => res.status(404).json({ error }));
				});
			}
		})
		.catch((error) => res.status(500).json({ error }));
};

//To find the top 3
exports.bestRatings = (req, res, next) => {
	Book.find()
		.sort({ averageRating: "desc" })
		.then((books) => res.status(200).json(books.splice(0, 3)))
		.catch((error) => res.status(400).json({ error }));
};

//To rate a book
exports.ratingBook = (req, res, next) => {
	const bookId = req.params.id;
	const userId = req.body.userId;
	const rate = req.body.rating;
};
