const express = require("express");

const router = express.Router();
const Book = require("../models/books.model");

// Poster un nouveau livre
router.post("/", (req, res, next) => {
	delete req.body._id;
	const book = new Book({
		...req.body,
	});
	book.save()
		.then(() => res.status(201).json({ message: "Objet enregistre !" }))
		.catch((error) => res.status(400).json({ error }));
});

// Recuperer tous les livres
router.get("/" + "", (req, res, next) => {
	Book.find()
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(400).json({ error }));
});

//Recuperer un seul livre
router.get("/:id", (req, res, next) => {
	Book.findOne({ _id: req.params.id })
		.then((books) => res.status(200).json(books))
		.catch((error) => res.status(404).json({ error }));
});

// Modifier un livre existant
router.put("/:id", (req, res, next) => {
	Book.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
		.then(() => res.status(200).json({ message: "Objet modifie !" }))
		.catch((error) => res.status(400).json({ error }));
});

// Supprimer un livre existant
router.delete("/:id", (req, res, next) => {
	Book.deleteOne({ _id: req.params.id })
		.then((books) => res.status(200).json({ message: "Objet supprime !" }))
		.catch((error) => res.status(404).json({ error }));
});

module.exports = router;
