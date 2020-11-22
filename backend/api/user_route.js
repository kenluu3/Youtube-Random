const express = require("express");
const router = express.Router();
const passport = require("passport"); /* For Login/Authentication */

const userModel = require("../models/user");/* User Model */
const jwt = require("jsonwebtoken"); /* JWT for authenticatuon */

/* Regex for valid Email */
function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

/*
router.get("/", function(req,res,next) {
    res.status(200).send("Hello World");
    next();
});
*/

/* Login Route */
router.post("/login", (req, res, next) => {

    passport.authenticate("login", {session: false}, (err, user, info) => {
        if (err) return next(err); /* Error with login */
        if (!user) return res.send({success: false, message: info.message}); /* User invalid */

        const body = {username: user.username, email: user.email, name: user.name};
        const token = jwt.sign(body, process.env.SECRET_KEY, {expiresIn: "3h"}); 

        /* Status: OK -- Successful login */
        res.status(200).send({
            success: true,
            user: user.username,
            token: "jwt " + token /* jwt strategy */
        });

        next();
    })(req, res, next);

});

/* Register Route */
router.post("/register", (req, res) => {

    const user = new userModel({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    if (!user.username || !user.name || !user.email || !user.password) { /* Ensure all fields are filled */
        res.status(400).send({success: false, message: "Missing credentials. Please fill in all fields."});
    } else {
        if (validEmail(user.email)) { /* Continue if email is valid format */
            user.username = user.username.toLowerCase(); /* Email/Username are case insensitive */
            user.email = user.email.toLowerCase();

            user.save((err, document) => {
                console.log("Document: " + document + " Error: " + JSON.stringify(err));
                if (err) { /* Error in DB */
                    if (err.code === 11000) { /* Duplicate Error -- On Unique fields */
                        if (err.keyPattern.username >= 1) {  /* keyPattern = 1 == Pattern already exists. */
                            res.status(400).send({success: false, message: "The username " + user.username + 
                            " is already registered. Please try again with a different username."});
                        } else if (err.keyPattern.email >= 1) { 
                            res.status(400).send({success: false, message: "The email " + user.email + 
                            " is already registered. Please try again with a different email."});
                        }
                    } 
                } else { /* OK -- Created successfully */
                    res.status(200).send({success: true, message: "The user " + document.username + " has been created successfully. You may now login."});
                }   
            });
        } else { /* Email Incorrect Format */
            res.status(400).send({success: false, message: "Please enter a valid email."});
        }
    }

});


module.exports = router;