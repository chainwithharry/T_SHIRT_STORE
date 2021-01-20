const express = require("express");
const router = express.Router();

const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth");
const {getUserById , pushOrderInPurchaseList } = require("../controllers/user");
const {updateStock} = require("../controllers/product");
const{getOrderById , createOrder , getAllOrders , getOrderStatus , updateStatus} = require("../controllers/order");

//params
router.param("orderId" , getOrderById);
router.param("userid" , getUserById);

//Order
router.post("/order/create/:userid" , isSignedIn , isAuthenticated , pushOrderInPurchaseList , updateStock , createOrder);
router.get("/order/all/:userid" , isSignedIn , isAuthenticated , isAdmin , getAllOrders);

//Order Status
router.get("order/status/:userid" , isSignedIn , isAuthenticated , isAdmin , getOrderStatus);
router.put("order/:orderId/status/:userid" , isSignedIn , isAuthenticated , isAdmin , updateStatus)


module.exports = router;

