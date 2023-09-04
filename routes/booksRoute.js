const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const booksCtrl = require("../controllers/booksController");

router.get("/", booksCtrl.getAllBooks);
router.get("/bestrating", booksCtrl.bestRatings);
router.post("/", auth, multer, booksCtrl.createBook);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", auth, multer, booksCtrl.modifyBook);
router.delete("/:id", auth, booksCtrl.deleteBook);
router.post("/:id/rating", auth, booksCtrl.ratingBook);
module.exports = router;
