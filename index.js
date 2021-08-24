const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const passport = require('passport');

const app = express();
const port = process.env.PORT || 3800;

// middleware
app.use(cors());
app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({ 'extended':false }));

// authentication configurations.
require('./config/auth');

// db connection
mongoose.connect(process.env.DB_HOST, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });

// routing
const videoRoutes = require('./api/videos');
const userRoutes = require('./api/users');

app.use('/user/', userRoutes);
app.use('/video', videoRoutes);

// expose web app.
app.listen(port, () => {
    console.log(`Application listening on port: ${port}`)
});


/*
require("./config/auth.js"); // passportjs auth

const passport = require("passport");

const path = require('path');


/* Connect to DB 
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

/* Passport Middleware for Authentication 
app.use(passport.initialize());

// Serve static assets in production (heroku)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('frontend/build'));
    
    app.get('*', (req, res) => { // serves the front-end react app.
        res.sendFile(path.join(__dirname, '/frontend/build/index.html'));
    });
}

*/
