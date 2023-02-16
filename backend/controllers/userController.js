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

    // Creating Token Hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");

    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpired: { $gt: Date.now() }, // Token Expiry date must be greater than now time
    });

    // if false
    if (!user) {
        return next(new ErrorHandler("Reset Password Token is invalid or has been expired", 400));
    }

    // if two passwords don't match
    if (req.body.password != req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    // Reset password - True
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpired = undefined;

    await user.save();

    sendToken(user, 200, res); // Auto Login after password reset

});

// Get User Details
exports.getUserDetails = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id); // will always be true, bcoz this can always be accessed by only those who are logged in
    // Their id is definitely there

    res.status(200).json({
        success: true,
        user, // send the user details
    });
});


// Update Password
exports.updatePassword = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.user.id).select("+password"); // bcoz will also select password which is set to false by default
    const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

    // if password doesn't match
    if (!isPasswordMatched) {
        return next(new ErrorHandler("Old password is incorrect", 400));
    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHandler("Password does not match", 400));
    }

    user.password = req.body.newPassword;

    await user.save();

    sendToken(user, 200, res); // Stay logged in after update password
});

// Update User Profile
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
    };

    // I will add cloudinary avatar later

    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true
    });
});

// Get all users
exports.updateProfile = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get all users -- Admin Previlige
exports.getAllUser = catchAsyncErrors(async(req, res, next) => {
    const users = await User.find();

    res.status(200).json({
        success: true,
        users,
    });
});

// Get single user details -- Admin Previlige
exports.getSingleUser = catchAsyncErrors(async(req, res, next) => {
    const user = await User.findById(req.params.id);

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true,
        user,
    });
});

// Update User Role -- Admin Previlige
exports.updateUserRole = catchAsyncErrors(async(req, res, next) => {

    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
    };

    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 400));
    }

    res.status(200).json({
        success: true
    });
});

// Delete User  -- Admin Previlige
exports.deleteUser = catchAsyncErrors(async(req, res, next) => {

    const user = await User.findById(req.params.id);
    // We will remove cloudinary later

    if (!user) {
        return next(new ErrorHandler(`User does not exist with ID: ${req.params.id}`, 400));
    }

    await user.remove();

    res.status(200).json({
        success: true,
        message: "User Deleted Successfully"
    });
});