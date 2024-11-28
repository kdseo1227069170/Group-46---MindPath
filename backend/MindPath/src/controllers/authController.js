const User = require('../models/User');
const TwoFA = require('../models/TwoFA');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const { send2FAEmail } = require('../utils/email');
const { sendAdminNotification } = require('../utils/email'); //TODO: update directory

const JWT_SECRET = 'your_jwt_secret';

let activeUsers = {};

// Phone number validation regex for Canada and USA (supports formats like +1-123-456-7890, 123-456-7890, etc.)
const phoneRegex = /^(?:\+1[-.\s]?)?(\d{3})[-.\s]?(\d{3})[-.\s]?(\d{4})$/;

// Password validation regex (minimum 8 characters, 1 uppercase, 1 number, 1 special character)
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;


// User Registration
exports.register = async (req, res) => {
    const { firstName, lastName, email, username, password, phoneNumber } = req.body;

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
		
		// Validate phone number
        if (!phoneRegex.test(phoneNumber)) {
            return res.status(400).json({ message: 'Invalid phone number. Please use a valid Canadian or US phone number.' });
        }

		 

        if (!passwordRegex.test(password)) {
            return res.status(400).json({
                message: 'Password must be at least 8 characters long, contain an uppercase letter, a number, and a special character'
            });
        }
		
		// Hash password using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10);
        
        // Create a new user
        const newUser = new User({ firstName, lastName, email, username, password, phoneNumber });
        await newUser.save();

        // Send notification to admin
        await sendAdminNotification(email, username);

        return res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Registration error:', error); 
        return res.status(500).json({ message: 'Server error' });
    }
};

// User Login
exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // Find the user by email
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid password' });
        }
		
		 

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        // Update last login time
        user.lastLogin = new Date();
        await user.save();
		
		// Track the logged-in user
        activeUsers[user._id] = { username, role: user.role };

        return res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Login error:', error); // Log for debugging
        return res.status(500).json({ message: 'Server error' });
    }
};



// Generate and send 2FA code that expires in 10 minutes
const send2FACode = async (user) => {
    const verificationCode = crypto.randomBytes(3).toString('hex'); 
    const expiresAt = moment().add(10, 'minutes').toDate(); 

    // Create or update the 2FA entry
    await TwoFA.findOneAndUpdate(
        { userId: user._id },
        { verificationCode, expiresAt },
        { upsert: true, new: true }
    );

    // Send the verification code to the user's phone or email
    console.log(`2FA code for ${user.email}: ${verificationCode}`); 
};

// Verify 2FA Code
exports.verify2FA = async (req, res) => {
    const { email, code } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user || !user.twoFACode || !user.twoFACodeExpires) {
            return res.status(400).json({ message: '2FA code has not been generated or user not found' });
        }

        if (user.twoFACode === code && moment().isBefore(user.twoFACodeExpires)) {
            const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
            user.twoFACode = null;
            user.twoFACodeExpires = null;
            await user.save();

            return res.status(200).json({ message: '2FA verified, login successful', token });
        }

        return res.status(400).json({ message: 'Invalid or expired 2FA code' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Server error' });
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, '-password'); 
    return res.status(200).json(users);
} catch (error) {
    return res.status(500).json({ message: 'Server error', error });
}
};

// Get active users
exports.getActiveUsers = (req, res) => {
    const loggedInUsers = Object.values(activeUsers);  // Get an array of logged-in user data
    res.status(200).json({ activeUsers: loggedInUsers });
};



// Delete User by Username
exports.deleteUserById = async (req, res) => {
    const { userId } = req.params; 
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Delete user error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};
