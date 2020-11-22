require("dotenv").config(); 
require("./config/auth.js"); /* Authorizaton File */

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const passport = require("passport");

const userRoutes = require("./api/user_route"); /* Routes for User-Related activities */
const videoRoutes = require("./api/video_route"); /* Routes for Youtube Video */

const app = express();

/* Connect to DB */
mongoose.connect(process.env.DB_HOST, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true, useFindAndModify: false});

/* Passport Middleware for Authentication */
app.use(passport.initialize());

/* Process 'Body' from Requests*/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); 

/* Routes for User-Related activities */
app.use("/", userRoutes);
app.use("/vid", videoRoutes);

app.listen(process.env.PORT, () => {
    console.log("Listening on port: " + process.env.PORT);
});