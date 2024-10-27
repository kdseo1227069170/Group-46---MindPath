const mongoose = require('mongoose');

const TwoFASchema = new mongoose.Schema({
	userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
	verificationCode: { type: String, required: true },
	expiresAt: { type: Date, required: true}
});

module.exports = mongoose.model('TwoFA', TwoFASchema);