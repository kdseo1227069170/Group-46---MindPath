

const User = require('../models/User');
const TwoFA = require('../models/TwoFA');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating random codes
const moment = require('moment'); // For handling time

// Secret key for JWT
const JWT_SECRET = 'your_jwt_secret';

// User Registration
exports.register = async (req, res) => {
	const { firstName, lastName, username,  password, phoneNumber } = req.body;
	
	try {
		// Check if the user already exists
		const existingUser = awit User.findOne({ email});
		if (existingUser) {
			return res.status(400).json({ message: 'Email already exists'});
		}
		
		// Create a new user
		const newUser = new User({firstName, lastName, email, username, password, phoneNumber });
		await newUser.save();
		
		return res.status(201).json({ message: 'User registered successfully' });
	}catch (error) {
		return res.status(500).json({ message: 'Server error', error });
	}
};

// User login
exports.login = async (req, res) => {
	const { email, password, verificationCode } = req.body;
	
	try {
		//find user by email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: 'User not found'});
		}
		
		// Check password
		const isMatch = await user.comparePassword(password);
		if (!isMatch) {
			return res.status(400).json({ message: 'Invalid password' });
		}
		
		// Check for 2FA
		if (user,is2FAEnabled) {
			const twoFAEntry = await TwoFA.findOne({ userId: user._id });
			
			// Validate the provided 2FA code
			if (!twoFAEntry || twoFAEntry.verificationCode !== verificationCode || moment().isAfter(twoFAEntry.expiresAt))	{
				return res.status(400).json({ message: 'Invalid or expired 2FA code' });
			}