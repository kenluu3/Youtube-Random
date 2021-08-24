const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const bcrypt = require('bcrypt');

const userModel = require('../models/user');

// Local Strategy for login authentication
passport.use(new localStrategy(
    async function(username, password, done) {
        try {
            // Attempts to retrieve the user.
            const user = await userModel.findOne({ $or: [{ username: username }, { email: username }]}).collation({ locale: "en", strength: 2 });
            // User does not exist.
            if (!user) {
                return done(null, false, { message: `The user ${username} is not registered.` });
            }
            // Verifying passwords.
            const matchPassword = await bcrypt.compare(password, user.password);

            // incorrect password
            if (!matchPassword) {
                return done(null, false, { message: 'Incorrect password was entered.' });
            } 
            
            // login successful.
            return done(null, user, { message: 'The user is authenticated successfully.' });
        } catch (err) {
            return done(err, false, { message: 'An error occurred while authenticating user.' });
        }
    }
));


/*
const userModel = require("../models/user"); /* User Model 

/* JWT Strategy for Managing Login Session 
const passport = require("passport");
const ExtractJWT = require("passport-jwt").ExtractJwt;
const JWTStrategy = require("passport-jwt").Strategy;



/* JWT for Authentication 
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
*/