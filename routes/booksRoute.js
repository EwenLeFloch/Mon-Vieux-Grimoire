const express = require("express");
const router = express.Router();

const limiter = require("../middleware/limiter");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");
const sharp = require("../middleware/sharp-config");

const booksCtrl = require("../controllers/booksController");

router.get("/", booksCtrl.getAllBooks);
router.get("/bestrating", booksCtrl.bestRatings);
router.post("/", limiter, auth, multer, sharp, booksCtrl.createBook);
router.get("/:id", booksCtrl.getOneBook);
router.put("/:id", limiter, auth, multer, sharp, booksCtrl.modifyBook);
router.delete("/:id", limiter, auth, booksCtrl.deleteBook);
router.post("/:id/rating", limiter, auth, booksCtrl.ratingBook);

module.exports = router;
