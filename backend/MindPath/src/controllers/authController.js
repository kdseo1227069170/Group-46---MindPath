const User = require('../models/User');
const TwoFA = require('../models/TwoFA');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const moment = require('moment');
const { send2FAEmail } = require('../utils/email');
const { sendAdminNotification } = require('../utils/email'); //TODO: update directory
const speakeasy = require('speakeasy');
const qrcode = require('qrcode');

const JWT_SECRET = process.env.JWT_SECRET;


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
/**		
		// Generate the 2FA secret
        const secret = speakeasy.generateSecret({
            name: 'Mindpath App',
            length: 20
        });
        
        newUser.twoFASecret = secret.base32; 
        newUser.is2FAEnabled = true; 
	*/	
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
    const { username, password, code } = req.body;

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
/**
		// Check if 2FA is enabled
        if (user.is2FAEnabled && user.twoFASecret) {
            await send2FACode(user); // Generate and send the 2FA code
            return res.status(200).json({
                message: '2FA code sent. Please verify to complete login.',
                requires2FA: true,
            });
        }


*/
		// Check if 2FA is enabled and verify the code
        if (user.is2FAEnabled && user.twoFASecret) {
            // Verify the code from the Google Authenticator app
            const isValid = speakeasy.totp.verify({
                secret: user.twoFASecret, // Secret stored for the user
                encoding: 'base32',       // The encoding of the secret (base32)
                token: code,              // The 2FA code entered by the user
                window: 1,                // Allow 1 step of time skew
            });

            if (!isValid) {
                return res.status(400).json({ message: 'Invalid 2FA code' });
            }
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

const blacklist = []; // For simplicity; use Redis or a database in production
const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes of inactivity

// Logout User
exports.logout = (req, res) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(400).json({ message: 'Authorization header is required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
        return res.status(400).json({ message: 'Invalid or expired token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        const userId = decoded.userId;

        // Check if the session exists
        const userSession = activeUsers[userId];
        if (!userSession) {
            return res.status(401).json({ message: 'Session not found. Please log in again.' });
        }

        // Check if the session has expired due to inactivity
        const now = Date.now();
        if (now - userSession.lastActivity > SESSION_TIMEOUT) {
            delete activeUsers[userId]; // Remove expired session
            return res.status(401).json({ message: 'Session expired due to inactivity. Please log in again.' });
        }

        // Remove the user session
        delete activeUsers[userId];

        // Optionally, add the token to the blacklist to prevent reuse
        blacklist.push(token);

        return res.status(200).json({ message: 'Logged out successfully' });
    } catch (error) {
        console.error('Logout error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


// Generate and send 2FA code that expires in 10 minutes
const send2FACode = async (user) => {
    const verificationCode = crypto.randomBytes(3).toString('hex'); 
    const expiresAt = moment().add(10, 'minutes').toDate(); 

    // Create or update the 2FA entry
    user.twoFACode = verificationCode;
    user.twoFACodeExpires = expiresAt;
    await user.save();

    // Send the verification code to the user's phone or email
    console.log(`2FA code for ${user.email}: ${verificationCode}`); 
};


// 2FA Verification Method
exports.verifyTwoFACode = async (req, res) => {
    const { userId, code } = req.body;

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (moment().isAfter(user.twoFACodeExpires)) {
            return res.status(400).json({ message: '2FA code has expired' });
        }

        if (user.twoFACode !== code) {
            return res.status(400).json({ message: 'Invalid 2FA code' });
        }

        // The 2FA code is correct
        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
        user.twoFACode = null;  
        user.twoFACodeExpires = null;  
        await user.save();

        return res.status(200).json({ message: '2FA verified successfully', token });
    } catch (error) {
        console.error('Error verifying 2FA code:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};




exports.verifyTwoFACode = async (req, res) => {
    try {
        
        res.status(200).json({ message: "2FA verified successfully" });
    } catch (error) {
        res.status(400).json({ message: error.message });
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



// Enable 2FA for a user
exports.enable2FA = async (req, res) => {
    const userId = req.userId; // Assuming you're using JWT and `userId` is available
    try {
        // Generate a secret key for the user
        const secret = speakeasy.generateSecret({
            name: 'Mindpath Authenticator', // Your application name
            length: 20
        });

        // Store the secret in the user's record
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.twoFASecret = secret.base32; // Save the base32 secret
        user.is2FAEnabled = true; // Mark 2FA as enabled
        await user.save();

        // Generate the QR code
        const qrCodeUrl = await qrcode.toDataURL(secret.otpauth_url);

        return res.status(200).json({
            message: '2FA enabled successfully',
            qrCodeUrl: qrCodeUrl, // Send QR code URL to client
            secret: secret.base32 // Send the secret in case the user needs to manually enter it
        });
    } catch (error) {
        console.error('Error enabling 2FA:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

