const express = require("express");
const router = express.Router();

const {google} = require("googleapis");
const youtube = google.youtube("v3");

const passport = require("passport"); // For Login/Authentication 
const userModel = require("../models/user");

// Returns a Randomly selected video from Youtube 
router.get('/generate', async (req,res) => {

    const maxResults = 50; // Max results returned from Youtube API
    const chosenVideo = Math.floor(Math.random() * (maxResults - 1) + 1);

    // Attaching Tags to Request 
    var query = [];
    var chosenQ = ''; // chosen tag

    // Query Params input as CSV 
    if (req.query.q !== undefined) {
        query = req.query.q.split(',');
        const numOpts = query.length;
        chosenQ = query[Math.floor(Math.random() * numOpts)];
    }   

    // Params for YT API Search 
    const searchParams = {
        part: 'snippet', 
        auth: process.env.YT_KEY, 
        type: 'video', 
        maxResults: maxResults, 
        q: chosenQ
    };

    try {
        const searchResults = await youtube.search.list(searchParams);
        const video = searchResults.data.items[chosenVideo];
        
        const selectedVideo = { // video returned to user.
            id: video.id.videoId, 
            title: video.snippet.title, 
            description: video.snippet.description,
            channel: video.snippet.channelTitle,
            channelID: video.snippet.channelId
        };
        res.status(200).send({success: true, video: selectedVideo});
    } catch(err) { // API Limit Reached (error) 
        res.status(500).send({success: false, message: 'Error has occurred. ' + err});
    }
});

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