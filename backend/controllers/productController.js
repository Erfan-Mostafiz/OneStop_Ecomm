// Import the product model
const { addListener } = require("../app");
const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create Product -- Admin
exports.createProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
});


// Get All Product
exports.getAllProducts = catchAsyncErrors(async(req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
});

// Get Product Details
exports.getProductDetails = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    res.status(200).json({ // then throw message
        success: true,
        product // send the product details
    })
});

// Update Product -- Admin
exports.updateProduct = catchAsyncErrors(async(req, res, next) => {

    let product = Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    // If product found
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product // first success, then send this updated product
    })
});

// Delete Product
exports.deleteProduct = catchAsyncErrors(async(req, res, next) => {

    const product = await Product.findById(req.params.id); // Product will be found by this

    if (!product) {
        return next(new ErrorHandler("Product not found", 404));
    }

    await product.remove(); // the product will delete itself if found

    res.status(200).json({ // then throw message
        success: true,
        message: "Product deleted successfully"
    })
});