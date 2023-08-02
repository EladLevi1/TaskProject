const mongoose = require('mongoose');

const schema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: 5,
        maxlength: 20
    },
    description: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 100
    },
    priority: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },
    isdone: {
        type: Boolean,
        default: false
    },
    createddate: {
        type: Date,
        required: true
    },
    expireddate: {
        type: Date,
        required: true
    },
    comments: {
        type: [String]
    }
});

module.exports = mongoose.model("Mission", schema);