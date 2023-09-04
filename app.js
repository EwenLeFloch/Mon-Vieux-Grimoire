const express = require("express");
const path = require("path");

const app = express();

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

// Routes
const booksRoutes = require("./routes/booksRoute");
app.use("/api/books", booksRoutes);
const usersRoutes = require("./routes/usersRoute");
app.use("/api/auth", usersRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));

// Gestion des erreurs
app.use((error, req, res, next) => {
	console.error("Error", error);
	res.status(500).json({ error: "Une erreur est survenue" });
});

module.exports = app;
