const express = require("express");
const router = express.Router();

const {getProductById , createProduct , getProduct , photo , updateProduct , deleteProduct, getAllProducts , getAllUniqueCategories} = require("../controllers/product");
const {getUserById} = require("../controllers/user");
const {isSignedIn , isAuthenticated , isAdmin} = require("../controllers/auth");

router.param("productId" , getProductById);
router.param("userid" , getUserById);

router.post("/product/create/:userid" , isSignedIn ,  isAuthenticated , isAdmin, createProduct);

router.get("/product/:productId" , getProduct);
router.get("/product/photo/:productId" , photo);

//delete route
router.delete("/product/:productId/:userid" , isSignedIn , isAuthenticated , isAdmin , deleteProduct);

//update route
router.put("/product/:productId/:userid" , isSignedIn , isAuthenticated , isAdmin , updateProduct);

//listing route
router.get("/products" , getAllProducts);
router.get("/products/categories" , getAllUniqueCategories);



module.exports = router;