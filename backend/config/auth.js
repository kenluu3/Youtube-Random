const passport = require("passport");

const userModel = require("../models/user"); /* User Model */ 

/* JWT Strategy for Managing Login Session */
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;

/* Local Strategy for Login */
const localStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

/* Login */
passport.use("login", new localStrategy({
    usernameField: "username",
    passwordField: "password",
    session: false
}, async function(username, password, done) {
    try {
        const user = username.toLowerCase(); /* Case in-sensitive in DB */

        await userModel.findOne({$or: [{username: user}, {email: user}]}, (err, result) => {
            if (err || result === null) { /* User not found */
                return done(null, false, {message: "User does not exist."});
            }

            /* User is found -- Compare password */
            bcrypt.compare(password, result.password).then(res => {
                /* Successful Login */
                return done(null, result, {message: "Login is successful." + res});
            }).catch(err => { /* Password Incorrect */
                return done(null, false, {message: "Incorrect password" + err});
            });

        });
    } catch(err) {/* DB Error -- Returns Error Message */
        return done(null, false, {message: err}); 
    }
}));

/* JWT for Authentication */
passport.use("jwt", new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme("jwt"),
}, function(payload, done) {
    try { /* Use payload information to validate user. */
        userModel.findOne({username: payload.username}, function(err, user) {
            if (err || user === null) { /* User not found-- JWT Invalid */
                done(null, false, {message: err});
            } else {
                done(null, user, {message: "User is authenticated."});
            }
        });
    } catch(err) { /* DB Error -- Returns Error Message */
        done(null, false, {message: err});
    } 
}));