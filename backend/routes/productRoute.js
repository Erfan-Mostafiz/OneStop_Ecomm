const express = require("express");
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts); // get the controller route

router.route("/product/new").post(createProduct); // post product route

router.route("/product/:id").put(updateProduct).delete(deleteProduct).get(getProductDetails);



module.exports = router