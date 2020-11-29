const express = require("express");
const router = express.Router();

const {google} = require("googleapis");
const youtube = google.youtube("v3");

/* Results for Video */
const maxResults = 50;

/* Returns a Randomly selected video from Youtube */
router.get("/generate", async function(req,res) {

    const chosenVideo = Math.floor(Math.random() * (maxResults - 1) + 1);

    /* Attaching Tags to Request */
    var query = [];
    var chosenQ = ""; /* Chosen query */

    /* Query Params input as CSV */
    if (req.query.q !== undefined) {
        query = req.query.q.split(",");
        const numOpts = query.length;
        chosenQ = query[Math.floor(Math.random() * numOpts)];
    }   

    /* Params for YT API Search */
    const searchParams = {
        part: "snippet", 
        auth: process.env.YT_KEY, 
        type: "video", 
        maxResults: maxResults, 
        q: chosenQ
    };

    try {
        const searchResults = await youtube.search.list(searchParams);
        const video = searchResults.data.items[chosenVideo];
        
        const selectedVideo = { /* Video Selected for User */
            id: video.id.videoId, 
            title: video.snippet.title, 
            description: video.snippet.description,
            channel: video.snippet.channelTitle,
            channelID: video.snippet.channelId
        };
        res.status(200).send({success: true, video: selectedVideo});
    } catch(err) { /* API Limit Reached (error) */
        res.status(500).send({success: false, message: "Error has occurred. " + err});
    }

});



module.exports = router; 