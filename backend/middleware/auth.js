const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticatedUser = catchAsyncErrors(async(req, res, next) => {
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

module.exports = isAuthenticatedUser;