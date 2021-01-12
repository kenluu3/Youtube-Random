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
    },
    favorites: {
        type: Array,
        default: []
    }
});

/* Pre-Hook Function to Hash Password before Saving */
USchema.pre('save', async function(next) {
    try {
        let user = this;
        const hash = await bcrypt.hash(user.password, JSON.parse(process.env.SALT_ROUNDS));
        user.password = hash; /* Save Hashed Password */
    } catch(err) { /* Error occurred while hashing */
        console.log("An error has occurred while hashing password. Error message: " + err);
    } finally {
        next();
    }
});

// Pre hook to hash password before updates.
USchema.pre('findOneAndUpdate', async function(next) {
    try {
        const updatePassword = this.getUpdate().$set.password;
        if (updatePassword) { // only hash password if it exists.
            const hash = await bcrypt.hash(updatePassword, JSON.parse(process.env.SALT_ROUNDS));
            this.getUpdate().$set.password = hash;
        }
    } catch(err) {
        console.log("An error has occurred while hashing password. Error message: " + err);
    } finally {
        next();
    }
});


const UserModel = mongoose.model("user", USchema);

module.exports = UserModel;
