const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const { use } = require("../routes/userRoute");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

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
    });

});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findOne({ email: req.body.email }); // find the user by their email

    if (!user) {
        return next(new ErrorHandler("User not found", 404));
    }

    // Get ResetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false });

    // Generating Link that will be sent through mail
    // Instead of http -> ${req.protocol}. Instead of localhost or 127.0.0.1 -> ${req.get("host")}
    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`;

    // Message to send with email. \n\n for two line breaks
    const message = `Your password reset token is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then please ignore it  `;

    try {
        await sendEmail({
            email: user.email, // whom to send email
            subject: `Ecommerce Website Password Recovery`,
            message,
        });

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email} successfully`
        })

    } catch (error) {
        // if error - make them undefined
        user.resetPasswordToken = undefined;
        user.resetPasswordExpired = undefined;

        // save the token after making them undefined
        await user.save({ validateBeforeSave: false });

        return next(new ErrorHandler(error.message, 500));
    }

});


// Reset Password
exports.resetPassword = catchAsyncErrors(async(req, res, next) => {
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
})