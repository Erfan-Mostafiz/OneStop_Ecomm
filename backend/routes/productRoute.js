const express = require("express");
const { getAllProducts, createProduct } = require("../controllers/productController");

const router = express.Router();

router.route("/products").get(getAllProducts); // get the controller route

router.route("/product/new").post(createProduct); // post product route

router.route("/product/:id").put()



module.exports = router