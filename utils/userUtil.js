const jwt = require('jsonwebtoken');

// validates email format.
function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

// generates a json web token for authentication.
function generateToken(username) {

    const payload = { user: username };
    
    // HMAC SHA256 - Symmetric Key
    const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });
    console.log()
    // Bearer scheme.
    return `Bearer ${token}`;
}

module.exports = {
    validateEmail,
    generateToken
};