const mongoose = require('mongoose');

const schema = mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    fullname: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/.test(value);
            },
            message: "Password must be at least 6 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character."
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^\S+@\S+\.\S+$/
    }
});

module.exports = mongoose.model("User", schema);