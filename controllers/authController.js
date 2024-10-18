

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