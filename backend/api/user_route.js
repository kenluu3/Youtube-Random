const express = require("express");
const router = express.Router();
const passport = require("passport"); // For Login/Authentication 

const userModel = require("../models/user");
const jwt = require("jsonwebtoken"); 

// Regex for valid Email 
function validEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

// Generates JWT
function genJWT(payload) {
    const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '3h'}); 
    return 'jwt ' + token;
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

// Register Route 
router.post('/register', (req, res) => {
    const user = new userModel({
        username: req.body.username,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });

    if (!user.username || !user.name || !user.email || !user.password) { 
        res.status(400).send({success: false, message: "Missing credentials. Please fill in all fields."});
    } else {
        if (validEmail(user.email)) { 
            user.username = user.username.toLowerCase(); // saving case insensitive
            user.email = user.email.toLowerCase();

            user.save((err, document) => {
                if (err) { // db error
                    console.log('Document: ' + document + ' Error: ' + JSON.stringify(err));
                    if (err.code === 11000) { // 11000 - duplicateError
                        if (err.keyPattern.username >= 1) {  // keyPattern = 1 means already exists (unique field)
                            res.status(400).send({success: false, message: `The username ${user.username} is already registered. Please try again with a different username.`});
                        } else if (err.keyPattern.email >= 1) { 
                            res.status(400).send({success: false, message: `The email ${user.email} is already registered. Please try again with a different email.`});
                        }
                    } 
                } else { // registered succesfully.
                    res.status(200).send({success: true, message: `The user ${document.username} has been created successfully. You may now login.`});
                }   
            });
        } else { 
            res.status(400).send({success: false, message: "Please enter a valid email."});
        }
    }
});

/* Routes related to user profile */
router.route('/profile/:user')
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
                            res.status(200).send({success: true, profile: favorites, authorized: false}); // access only to favorites list.
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
                    favorites: favorites
                }

                return res.status(200).send({success: true, profile: data, authorized: true});
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