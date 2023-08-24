const express = require("express");
const morgan = require("morgan");

const app = express();

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

// Route pour créer un nouvel objet
app.post("/api/books", (req, res, next) => {
	console.log(req.body);
	res.status(201).json({
		message: "Objet créé !",
	});
});

// Route pour obtenir une liste d'objets
app.get("/api/books", (req, res, next) => {
	const books = [
		{
			_id: "1",
			title: "Mon premier objet",
			description: "Les infos de mon premier objet",
			imageUrl:
				"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			price: 4900,
			userId: "qsomihvqios",
		},
		{
			_id: "2",
			title: "Mon deuxième objet",
			description: "Les infos de mon deuxième objet",
			imageUrl:
				"https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
			price: 2900,
			userId: "qsomihvqios",
		},
	];
	res.status(200).json(books);
});

module.exports = app;
