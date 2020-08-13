const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

var Tip = new Schema({
    receiver: {
        type: String,
        required: true,
        trim: true
    },
    sender: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Date,
        default: Date.now()
    },
    gateway: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    amount: {
        type: Number
    }
});

mongoose.model('Tip', Tip);