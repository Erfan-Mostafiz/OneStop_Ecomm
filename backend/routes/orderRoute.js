const express = require("express");
const { newOrder, getSingleOrder, myOrders, getAllOrders, updateOrder, deleteOrder } = require("../controllers/orderController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

// Place Order Route
router.route("/order/new").post(isAuthenticatedUser, newOrder);

// See all user's orders Route
router.route("/order/:id").get(isAuthenticatedUser, getSingleOrder);

// logged in user's orders route
router.route("/orders/me").get(isAuthenticatedUser, myOrders);

// Admin route -- get all orders
router.route("/admin/orders").get(isAuthenticatedUser, authorizeRoles("admin"), getAllOrders);


router.route("/admin/order/:id")
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateOrder)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteOrder);

module.exports = router;