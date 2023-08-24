const express = require("express");
const morgan = require("morgan");

const app = express();
const Book = require("./models/books.model");

// Utilisation de morgan pour le logging des requêtes
app.use(morgan("combined"));

//Middleware pour gérer les requêtes JSON
app.use(express.json());

//Middleware pour gérer les en-têtes CORS
app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);
	next();
});

// Gestion des erreurs
app.use((error, req, res, next) => {
	console.error("Error", error);
	res.status(500).json({ error: "Une erreur est survenue" });
});

module.exports = app;
