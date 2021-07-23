// dependencies
const express = require('express');
const cors = require('cors');
const app = express();

const port = process.env.PORT || 3800;

// middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ 'extended':false }));

// routing
const videoRoutes = require('./api/videos');
const userRoutes = require('./api/users');

//app.use('/user/', userRoutes);
app.use('/video', videoRoutes);

app.listen(port, () => {
    console.log(`Application listening on port: ${port}`)
})


/*
require("./config/auth.js"); // passportjs auth

const mongoose = require("mongoose");
const passport = require("passport");

const path = require('path');


/* Connect to DB 
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

/* Passport Middleware for Authentication 
app.use(passport.initialize());

/* Process 'Body' from Requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

// allow requests from any endpoint.

/* Routes for User-Related activities 
app.use("/", userRoutes);
app.use("/vid", videoRoutes);

// Serve static assets in production (heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    
    app.get('*', (req, res) => { // serves the front-end react app.
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    });
}

*/
