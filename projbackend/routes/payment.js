const express = require("express");
const { isSignedIn, isAuthenticated } = require("../controllers/auth");
const { getToken, processPayment } = require("../controllers/paymentB");
const { getUserById } = require("../controllers/user");
const router = express.Router();


router.param("userid" , getUserById);

router.get("/payment/gettoken/:userid" , isSignedIn , isAuthenticated , getToken);

router.post("/payment/braintree/:userid" , isSignedIn , isAuthenticated , processPayment);


module.exports = router;