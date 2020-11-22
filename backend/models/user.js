const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); /* For hashing password */

const Schema = mongoose.Schema;

/* User Model stored in DB */
const USchema = new Schema({
    email: {
        type: String,
        unique: true,
        required: true
    }, 
    username: {
        type: String,
        unique: true,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

/* Pre-Hook Function to Hash Password before Saving */
USchema.pre("save", async function(next) {
    try {
        const user = this;
        const hash = await bcrypt.hash(user.password, JSON.parse(process.env.SALT_ROUNDS));
        user.password = hash; /* Save Hashed Password */
        next();
    } catch(err) { /* Error occurred while hashing */
        console.error("An error has occurred while hashing password. error message: " + err);
        next();
    }
});


const UserModel = mongoose.model("user", USchema);

module.exports = UserModel;
