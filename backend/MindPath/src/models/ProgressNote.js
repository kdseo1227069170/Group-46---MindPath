//Progress Tracker module
const mongoose = require('mongoose');

const progressNoteSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    note: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

const ProgressNote = mongoose.model('ProgressNote', progressNoteSchema);

module.exports = ProgressNote;
