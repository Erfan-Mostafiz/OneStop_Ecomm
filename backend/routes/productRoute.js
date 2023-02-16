const express = require("express");
const {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getProductDetails
} = require("../controllers/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts); // get the controller route

router.route("/admin/product/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct); // create product route [admin]

router.route("/admin/product/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct) // update product route [admin]
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct) // delete product route [admin]


router.route("/product/:id").get(getProductDetails); // single product route



module.exports = router