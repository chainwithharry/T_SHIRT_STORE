const express = require("express");
const router = express.Router();

const {getUserById , getUser} = require("../controllers/user");
const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth");
const {updateUser} = require("../controllers/user");;
const {userPurchaseList} = require("../controllers/user");;


router.param("userid" , getUserById);
router.get("/user/:userid" ,isSignedIn , isAuthenticated ,  getUser);
router.put("/user/:userid" ,isSignedIn , isAuthenticated ,  updateUser);
router.get("/orders/user/:userid" ,isSignedIn , isAuthenticated ,  userPurchaseList);



module.exports = router;