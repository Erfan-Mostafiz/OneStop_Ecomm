const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto"); // built-in model

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Enter Your Name"],
        maxLength: [30, "Name cannot exceed 30 characters"],
        minLength: [4, "Name should have more than 4 characters"]
    },
    email: {
        type: String,
        required: [true, "Please Enter Your Email"],
        unique: true, // 2 users can't have same email
        validate: [validator.isEmail, "Please Enter a Valid Email"],
    },
    password: {
        type: String,
        required: [true, "Please Enter Your Password"],
        minLength: [8, "Password should be greater than 8 characters"],
        select: false, // whenever find method will be called, password field will not be shown   
    },
    avatar: {
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    },
    role: {
        type: String,
        default: "user", // default - user, until we make him admin
    },

    resetPasswordToken: String,
    resetPasswordExpired: Date,
});

userSchema.pre("save", async function(next) {

    // to check if ps changed. If not, while updating user info, no need to hash ps again which is already encrypted
    if (!this.isModified("password")) {
        next(); // don't encrypt ps again
    }

    // only change pass when its modified, or new user pass save [encrypted]
    this.password = await bcrypt.hash(this.password, 10) // password of 10 chars and encrypting
});

// JWT TOKEN - Generate Token and store in cookie. To tell browser that this is user and can access user routes
userSchema.methods.getJWTToken = function() {
    // {id:this._id} = this user's id
    // process.env.JWT_SECRET - a key which only the user has access to. 
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE, // expire the token
    });
};

// Compare Password
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function() {

    //Generating Token of 20 random bytes in String Hex Format
    const resetToken = crypto.randomBytes(20).toString("hex");

    //Hasing and adding resetPasswordToken to user schema
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    this.resetPasswordExpired = Date.now() + 15 * 60 * 1000; // password can be reset within 15 mins after generating token

    return resetToken; // this token will be sent through mail, and the user will click it to reset their password
};

module.exports = mongoose.model("User", userSchema);