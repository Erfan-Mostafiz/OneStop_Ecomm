const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { use } = require("../routes/userRoute");

// Register a User
exports.registerUser = catchAsyncErrors(async(req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilePicUrl"
        }
    });

    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async(req, res, next) => {
    const { email, password } = req.body;

    //Checking if user has given password and email both
    if (!email || !password) {
        return next(new ErrorHandler("Please Enter Email & Password", 400))
    }

    const user = await User.findOne({ email }).select("+password"); // select("+password") bcoz password select was false. So need to provide

    if (!user) {
        return next(new ErrorHandler("Invaid email or password", 401));
    }

    const isPasswordMatched = await user.comparePassword(password);

    // if password doesn't match
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Invalid email or password", 401));
    }

    // if password matches
    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async(req, res, next) => {

    res.cookie("token", null, { // make token value null
        expires: new Date(Date.now()), // token expires right now
        httpOnly: true,
    })

    res.status(200).json({
        success: true,
        message: "Logged out"
    })

});