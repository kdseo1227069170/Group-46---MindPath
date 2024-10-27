// Basic SearchLog for storing search queries

const mongoose = require('mongoose');

const SearchLogSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    searchTerm: String,
    searchDate: { type: Date, default: Date.now },
});

const SearchLog = mongoose.model('SearchLog', SearchLogSchema);

module.exports = SearchLog;