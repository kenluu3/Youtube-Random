// dependencies
const express = require('express');
const router = express.Router();
const videoUtil = require('../utils/video_util');

// retrieve YouTube route.
router.get('/get', async (req, res) => {

    let filter = '';
    let result = {};

    //incoming query will be csv format.
    if (req.query.filter) {
        const filterList = req.query.filter.split(",")
        filter = filterList[Math.floor(Math.random() * filterList.length)]
    }
    
    // invoke request.
    try {
        result = await videoUtil.getVideo(filter);
    } catch(e) {
        result = e;
    }

    return res.send(result);
})

module.exports = router;

/*

const passport = require("passport"); // For Login/Authentication 
const userModel = require("../models/user");


// Saving Video to Favorites List.
router.put('/save', passport.authenticate('jwt', {session: false}), async (req,res) => {

    const { user, video } = req.body; 

    const opts = {
        new: true,
    }

    userModel.findOneAndUpdate({username: user}, {$addToSet: { favorites: video}}, opts) // Saves video into DB favorites list (unique only)
        .then(result => {
            if (result) {
                res.status(200).send({success: true, message: 'The video has been saved successfully.'});
            } else { // user not found.
                res.status(400).send({success: false, message: 'This user does not exist. Saving to favorites has failed.'});
            }
        })
        .catch(err => {
            console.log(JSON.stringify(err));
            res.status(500).send({success: false, message: 'An issue has occurred with the save.'});
        });
});

// Removing Video from Favorites List.
router.put('/remove', passport.authenticate('jwt', {session: false}), async(req,res) => {
    const { videoID } = req.body;

    userModel.findOneAndUpdate({username: req.user.username}, {$pull: {favorites: {id: videoID }}})
        .then(result => {
            if (result) {
                res.status(200).send({success: true, message: 'The video has been removed from favorites.'});
            } else {
                res.status(400).send({success:false, message: 'This user does not exist. Removal failed.'});
            }
        })
        .catch(err => { // DB error.
            console.log(JSON.stringify(err));
            res.status(500).send({success: false, message: 'An issue has occurred with favorites removal.'});
        });
});

module.exports = router; 
*/