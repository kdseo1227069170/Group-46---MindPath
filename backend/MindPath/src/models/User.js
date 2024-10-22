


const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Define the User schema
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password : { type: String, required: true },
	phoneNumber: { type: String, required: true },
	is2FAEnabled: { type: Boolean, default: false },
	twoFACode: { type: String },
	twoFACodeExpires: { type: Date},
	createdAt: { type: Date, default: Date.now},
	lastLogin: { type: Date },
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
	if (!this.isModified('password')){
		return next();
	}
	//Generate salt
	const salt = await bcrypt.genSalt(10);
	// Hash the password
	this.password = await bcrypt.hash(this.password, salt);
	next();
});

//Method to compare passwords
userSchema.methods.comparePassword = async function (password) {
	return await bcrypt.compare(password, this.password);
};

//Export the user model
module.exports = mongoose.model('User', userSchema);