const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const speakeasy = require('speakeasy'); 

// Define the User schema
const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true, unique: true },
	username: { type: String, required: true, unique: true },
	password : { type: String, required: true },
	phoneNumber: { type: String, required: true },
	is2FAEnabled: { type: Boolean, default: true },
	twoFASecret: { type: String },
	twoFACode: { type: String },
	twoFACodeExpires: { type: Date},
	twoFAExpire: { type: Date },
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

// Generate a 2FA secret
userSchema.methods.generate2FASecret = function () {
    const secret = speakeasy.generateSecret({
        name: 'Mindpath App',
        length: 20
    });

    this.twoFASecret = secret.base32;  // Store the secret in the user model
    this.twoFAExpire = Date.now() + 300000;  // Optional: Set an expiration for the secret (5 minutes)
    return secret;
};

// Method to validate the 2FA code
userSchema.methods.validate2FACode = function (userInputCode) {
    // Validate the user's 2FA code using Speakeasy
    const verified = speakeasy.totp.verify({
        secret: this.twoFASecret,     // The secret stored for the user
        encoding: 'base32',           // The encoding of the secret
        token: userInputCode,        // The code entered by the user
        window: 1                     // Optional: allow a window for slight delays in code generation
    });

    return verified;  // Returns true if the code is valid, false otherwise
};


//Export the user model
module.exports = mongoose.model('User', userSchema);
