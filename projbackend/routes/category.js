const express = require("express");
const router = express.Router();

const {getCategoryById , createCategory , getCategory , getAllCategories , updateCategory , removeCategory} = require("../controllers/category");
const {isSignedIn , isAdmin , isAuthenticated} = require("../controllers/auth");
const {getUserById} = require("../controllers/user");

//PARAMS
router.param("userid" , getUserById);
router.param("categoryId" , getCategoryById);


//ACTUAL ROUTES GOES HERE

//Category Creation
router.post("/category/create/:userid" , isSignedIn , isAuthenticated , isAdmin , createCategory);

//Category Displaying
router.get("/category/:categoryId" , getCategory);
router.get("/categories" , getAllCategories);

//Category Updating
router.put("/category/:categoryId/:userid" , isSignedIn , isAuthenticated , isAdmin , updateCategory);

//Category Deleting
router.delete("/category/:categoryId/:userid" , isSignedIn , isAuthenticated , isAdmin , removeCategory);
module.exports = router;