const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
    const { token } = req.cookies;

    // if token not found
    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    // Until logged in, can access the user data
    req.user = await User.findById(decodedData.id);

    next();

});

// Admin Authorize
// ...roles --> Array
exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {

        // req.user contains full user data
        const isAdmin = roles.includes(req.user.role); // roles.includes(req.user.role) checks if the user role is inside the Roles Array

        // if not admin
        if (!isAdmin) {
            return next(new ErrorHandler(`Role: ${req.user.role} is not allowed to access this resource`, 403));
        }

        // if Admin
        next();
    };
};