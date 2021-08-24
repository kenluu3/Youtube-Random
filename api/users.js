const express = require('express');
const router = express.Router();

const userModel = require('../models/user');
const userUtil = require('../utils/userUtil');

// register user into database.
router.post('/register', async (req, res) => {   

    const user = new userModel({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    // missing credentials.
    if (!(user.username && user.email && user.password)) {
        res.status(400).send({ message: 'Missing required credentials for registration process. Please provide data in all required fields.' });
    // invalid email format.
    } else if (!userUtil.validateEmail(user.email)) {
        res.status(400).send({ message: `The entered email ${user.email} is not a valid email. Please ensure your email format is correct. `});
    } else {
        // create user in database.
        try {
            const data = await user.save();
            res.send({ message: `User registration for ${user.username} has been completed.` });
            
        } catch (err) {
            let errMessage = JSON.stringify(err);
            // duplicate error 
            if (err.code == 11000) {
                // username duplicate
                if (err.keyPattern.username == 1) {
                    errMessage = `Username ${user.username} is already registered. Please try again with a different username`;
                // email duplicate
                } else if (err.keyPattern.email == 1) {
                    errMessage = `Email ${user.email} is already registered. Please try again with a different email`;
                }
            }    
            
            res.status(400).send({ message: errMessage });
        }
    }
})


module.exports = router;

/*

const passport = require("passport"); // For Login/Authentication 

const jwt = require("jsonwebtoken"); 

// Generates JWT
function genJWT(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '3h'}); 
    return 'Bearer ' + token; // bearer scheme
}

// Login Route 
router.post('/login', (req, res, next) => {

    passport.authenticate("login", {session: false}, (err, user, info) => {
        if (err) return next(err); // server error
        if (!user) return res.status(400).send({success: false, message: info.message}); // invalid user & not authenticated.

        const body = {username: user.username};
        const jwt = genJWT(body);

        res.status(200).send({ // successful login
            success: true,
            user: user.username,
            token: jwt // jwt scheme
        });

    })(req, res, next);

});

/* Routes related to user profile 
router.route('/profile/user/:user')
    .get((req,res,next) => {
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err) { 
                console.log(err);
                return res.status(500).send({success: false, message: 'An error has occurred.'});
            }

            let searchUser = req.params.user.toLowerCase(); // user profile to display.

            if (user == false || searchUser !== user.username) { // unauthorized user/searching another user  
                userModel.findOne({username: searchUser})
                    .then(result => {
                        if (result) {
                            const { favorites } = result;
                            res.status(200).send({success: true, favorites: favorites}); // access only to favorites list.
                        } else {
                            res.status(400).send({success: false, message: 'This user does not exist.'});
                        }
                    })
                    .catch(err => { // db error
                        console.log(err);
                        res.status(500).send({success: false, message: 'An error has occurred'});
                    });
            } else { // user is authorized here and search user is themselves.  
                const { name, username, email, favorites } = user;

                const data = {
                    name: name,
                    username: username, 
                    email: email,
                }

                return res.status(200).send({success: true, profile: data, favorites: favorites});
            }
        })(req,res,next);
    })
    .patch((req,res,next) => { // updating user information
        passport.authenticate('jwt', {session: false}, (err, user, info) => {
            if (err) { // passport err
                console.log(err);
                return res.status(500).send({success: false, message: 'An error has occurred'});
            }

            const profile = req.params.user.toLowerCase();

            if (!user || user.username !== profile) { // user unauthorized.
                return res.status(401).send({success: false, message: 'Unauthorized'});
            }

            // user is authenticated & editing own profile.
            const { name, username, email, password } = req.body;
            const update = {
                name: name,
                username: username, 
                email: email,
                password: password
            };

            const opts = {
                new: true,
                omitUndefined: true
            }

            userModel.findOneAndUpdate({username: profile}, {$set: update}, opts)
                .then(result => { 
                    if (result) { // update successful
                        if (result.username !== profile) { // If username has changed, need to send new token.
                            const body = {username: result.username};
                            const jwt = genJWT(body);
                            res.status(200).send({success: true, message: 'Information has been saved successfully.', token: jwt});
                        } else { 
                            res.status(200).send({success: true, message: 'Information has been saved successfully.'});
                        }
                    } else { // user not found - should be caught from auth above.
                        res.status(400).send({success: false, message: 'User update failed, resource does not exist.'});
                    }
                })
                .catch(err => { // db error
                    if (err.code === 11000) { // keyPattern error
                        if (err.keyPattern.username >= 1) {  // keyPattern = 1 means already exists (unique field)
                            res.status(400).send({success: false, message: `The username ${update.username} is taken. Please try again with different username.`});
                        } else if (err.keyPattern.email >= 1) { 
                            res.status(400).send({success: false, message: `The email ${update.email} is taken. Please try again with a different email.`});
                        }
                    }
                });
        })(req,res,next);
    });

module.exports = router;
*/