// validates email format.
function validateEmail(email) {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

module.exports = {
    validateEmail
};