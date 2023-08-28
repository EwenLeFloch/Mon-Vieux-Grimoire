const express = require("express");

const router = express.Router();
const booksControllers = require("../controllers/books.model");

router.get("/", booksControllers.getAllBooks);
router.post("/", booksControllers.createBook);
router.get("/:id", booksControllers.getOneBook);
router.put("/:id", booksControllers.modifyBook);
router.delete("/:id", booksControllers.deleteBook);

module.exports = router;
