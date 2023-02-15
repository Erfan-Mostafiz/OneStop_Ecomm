const express = require("express");
const { registerUser, loginUser, logout, forgotPassword } = require("../controllers/userController");
const router = express.Router();

// User Registration route
router.route("/register").post(registerUser);

// User Login route
router.route("/login").post(loginUser);

// Forgot Password route
router.route("/password/forgot").post(forgotPassword);

// User Logout route
router.route("/logout").get(logout);

// Export the router
module.exports = router;