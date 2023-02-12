// Import the product model
const { addListener } = require("../app");
const Product = require("../models/productModel");

// Create Product -- Admin
exports.createProduct = async(req, res, next) => {

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}


// Get All Product
exports.getAllProducts = async(req, res) => {

    const products = await Product.find();

    res.status(200).json({
        success: true,
        products
    })
}

// Get Product Details
exports.getProductDetails = async(req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    res.status(200).json({ // then throw message
        success: true,
        product // send the product details
    })
}

// Update Product -- Admin
exports.updateProduct = async(req, res, next) => {

    let product = Product.findById(req.params.id);

    if (!product) { // if product not found
        return res.status(500).json({
            succes: false,
            message: "Product not found"
        })
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
}

// Delete Product
exports.deleteProduct = async(req, res, next) => {

    const product = await Product.findById(req.params.id); // Product will be found by this

    if (!product) {
        return res.status(500).json({
            success: false,
            message: "Product not found"
        })
    }

    await product.remove(); // the product will delete itself if found

    res.status(200).json({ // then throw message
        success: true,
        message: "Product deleted successfully"
    })
}