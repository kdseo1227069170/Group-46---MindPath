const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5,
    },
    comments: {
        type: String,
        required: true,
    },
    submittedAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model('Feedback', feedbackSchema);