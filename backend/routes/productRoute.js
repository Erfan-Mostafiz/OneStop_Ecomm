const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");
const isAuthenticatedUser = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts); // get the controller route

router.route("/product/new").post(isAuthenticatedUser, createProduct); // post product route

router.route("/product/:id").put(isAuthenticatedUser, updateProduct).delete(isAuthenticatedUser, deleteProduct).get(getProductDetails);



module.exports = router