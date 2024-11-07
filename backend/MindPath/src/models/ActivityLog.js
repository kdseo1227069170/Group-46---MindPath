//For the admin dashboard to record # of logins of the Admin as an Activity Log
const mongoose = require('mongoose');

const ActivityLogSchema = new mongoose.Schema({
    adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    action: String,
    timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('ActivityLog', ActivityLogSchema);
