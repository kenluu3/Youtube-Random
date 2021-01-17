require("dotenv").config(); 
require("./config/auth.js"); // passportjs auth

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");
const cors = require('cors');
const userRoutes = require('./api/user_route'); // Routes for User-Related activities 
const videoRoutes = require('./api/video_route'); // Routes for Youtube Video 
const path = require('path');

const app = express();

/* Connect to DB */
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

/* Passport Middleware for Authentication */
app.use(passport.initialize());

/* Process 'Body' from Requests*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// allow requests from any endpoint.
app.use(cors());

/* Routes for User-Related activities */
app.use("/", userRoutes);
app.use("/vid", videoRoutes);

// Serve static assets in production (heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    app.get('*', (req, res) => { // serves the front-end react app.
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    });
}

const port = process.env.PORT || 3800;

app.listen(port, () => {
    console.log("Listening on port: " + port);
});