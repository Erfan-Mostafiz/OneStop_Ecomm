const express = require("express");
const { registerUser, loginUser, logout } = require("../controllers/userController");
const router = express.Router();

// User Registration route
router.route("/register").post(registerUser);

// User Login route
router.route("/login").post(loginUser);

// User Logout route
router.route("/logout").get(logout);

// Export the router
module.exports = router;