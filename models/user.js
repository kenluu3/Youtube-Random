const bcrypt = require('bcrypt');
const Schema = require('mongoose').Schema;
const model = require('mongoose').model;

const userSchema = new Schema({
    email: {
        type: String,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        },
        required: true,
    },
    username: {
        type: String,
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        },
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

// encrypt password before saving.
userSchema.pre('save', async function (next) {
    try {
        this.password = await bcrypt.hash(this.password, JSON.parse(process.env.SALT_ROUNDS));
    } catch (err) {
        console.log(`Error occurred during password hash ${err}`);
    } finally {
        next();
    }
});

// exporting model.
module.exports = model('user', userSchema);