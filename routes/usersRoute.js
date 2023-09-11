const express = require("express");
const router = express.Router();
const limiter = require("../middleware/limiter");
const usersCtrl = require("../controllers/usersController");

router.post("/signup", limiter, usersCtrl.signup);
router.post("/login", limiter, usersCtrl.login);

module.exports = router;
