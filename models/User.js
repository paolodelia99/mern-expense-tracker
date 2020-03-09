const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstName : {
        type: String,
        required: [true, 'Please add the first name']
    },
    lastName : {
        type: String,
        required: [true, 'Please add the last name']
    },
    email : {
        type: String,
        required: [true, 'Please add the email']
    },
    password : {
        type: String,
        required: [true, 'Please add a password']
    },
    createdAt : {
        type: Date,
        default: Date.now
    },
    transactions : {
        type: Array,
        required: true,
        default: []
    }
});

module.exports = mongoose.model('User',UserSchema);