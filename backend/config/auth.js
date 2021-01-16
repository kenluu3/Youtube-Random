const userModel = require("../models/user"); /* User Model */ 

/* JWT Strategy for Managing Login Session */
const passport = require("passport");
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
}, (username, password, done) => {
    const user = username.toLowerCase(); // case insensitive in DB

    userModel.findOne({$or: [{username: user}, {email: user}]})
        .then(result => { // returns null if not found.
            if (result) { // user exists 
                bcrypt.compare(password, result.password, (err, same) => {
                    if (err) { 
                        return done(null, false, {success: false, message: 'Server Error: ' + err});
                    }

                    if (same) { // password matches
                        return done(null, result, {success: same, message: 'You have successfully logged in!'});
                    } else {
                        return done(null, false, {success: same, message: 'Password is incorrect. Please try again'});
                    }
                });
            } else {
                return done(null, false, {success: false, message: 'This user does not exist. Please try again'});
            }
        })
        .catch(err => { // db error 
            return done(null, false, {success: false, message: err});
        });
}));

/* JWT for Authentication */
passport.use('jwt', new JWTStrategy({
    secretOrKey: process.env.SECRET_KEY,
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken()
}, (payload, done) => { // passportjwt automatically respects expiration time do not need to manually verify.

    userModel.findOne({username: payload.username.toLowerCase()}) // verifying the payload user actually exists.
        .then(user => {
            if (user) { // user found in db means user is authenticated.
                // user is accessed in next req via req.user and info message via req.authInfo
                done(null, user, {success: true, message: 'The user is an authenticated user.'});
            } else { 
                done(null, false, {success: false, message: 'The user is not found. This token is invalid.'});
            }
        })
        .catch(err => { // db error
            console.log('passport error:' + err);
            done(null, false, {success:false, message: 'An error has occurred.'});
        })
    }
));