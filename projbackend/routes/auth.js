const { body, validationResult } = require('express-validator');
const { Router } = require("express");
var express = require("express");
var router = express.Router();
const {signout} = require("../controllers/auth");
const {signup} = require("../controllers/auth");
const {signin} = require("../controllers/auth");
const {isSignedIn} = require("../controllers/auth");
const {isAuthenticated} = require("../controllers/auth");
const {isAdmin} = require("../controllers/auth");

const {check} = require("express-validator");

const signUpValidation = [
    // email must be an email
    body('email').isEmail().withMessage("Email is Incorrect"),

    body('password').isLength({min: 5}).withMessage("Password is too short...!")
];

const signInValidation = [
    body('email').notEmpty().withMessage("Email is Required"),

    body('password').notEmpty().withMessage("Password is Required")
];

router.get("/signout" , signout);
router.post("/signup" , signUpValidation , signup);
router.post("/signin" , signInValidation , signin);




router.get("/testroute" , isSignedIn , (req,res)=>{
    res.send("user Signed in");
})


module.exports = router;