const express = require("express");
const {
    registerUser,
    loginUser,
    logout,
    forgotPassword,
    resetPassword,
    getUserDetails,
    updatePassword,
    updateProfile,
    getAllUser,
    getSingleUser,
    updateUserRole,
    deleteUser
} = require("../controllers/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

// User Registration route
router.route("/register").post(registerUser);

// User Login route
router.route("/login").post(loginUser);

// Forgot Password route
router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassword);

// User Logout route
router.route("/logout").get(logout);

// User Details route
router.route("/me").get(isAuthenticatedUser, getUserDetails);

// Update Password Route
router.route("/password/update").put(isAuthenticatedUser, updatePassword);

// Update Profile Route
router.route("/me/update").put(isAuthenticatedUser, updateProfile);

// Get all user details Route-- admin previlige
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser);

// Get single user details Route -- admin previlige
router
    .route("/admin/user/:id")
    .get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser)
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateUserRole)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);

// Export the router
module.exports = router;