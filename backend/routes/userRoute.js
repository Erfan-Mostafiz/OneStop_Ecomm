const express = require("express");
const { registerUser } = require("../controllers/userConstroller");
const router = express.Router();

router.route("/register").post(registerUser);

module.exports = router;