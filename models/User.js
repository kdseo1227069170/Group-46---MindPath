


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const UserSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password : { type: String, required: true },
	phoneNumber: { type: String, required: true },
	is2FAEnabled: { type: Boolean, default: false },
	createdAt: { type: Date, default: Date, now},
	lastLogin: { type: Date },
});

// Hash password before saving the user
UserSchema.pre('save', async function (next) {
	if (!this.isModified('password')){
		return next();
	}

module.exports = mongoose.model('User', UserSchema);