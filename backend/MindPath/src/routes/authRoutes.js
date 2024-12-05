const express = require('express')
const router = express.Router()
const User = require('../models/User');
const authController = require('../controllers/authController');
const Admin = require('../models/adminModel'); //for the Admin user
const { body, validationResult } = require('express-validator');
const { verifyToken } = require('../middlewares/middleware');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const { verifyTwoFACode } = require('../controllers/authController');

// Validation middleware for registering a user
const validateRegister = [
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
	body('username').not().isEmpty().withMessage('Username is required'), 
    body('password')
        .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/).withMessage('Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character (@, $, !, %, *, ?, &)')
    ,
    body('phoneNumber')
        .matches(/^\d{3}[\s\-]?\d{3}[\s\-]?\d{4}$/).withMessage('Please enter a valid phone number (USA or Canada)')
        .isLength({ min: 10, max: 10 }).withMessage('Phone number must be exactly 10 digits long')
];

// Validation middleware for logging in a user
const validateLogin = [
    body('username').not().isEmpty().withMessage('Username is required'),
    body('password').not().isEmpty().withMessage('Password is required')
];

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', validateRegister, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    }
    next();
}, authController.register);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); 
    }
    next();
}, authController.login);

// @route   POST /api/auth/logout
// @desc    Logout user
// @access  Private

router.post('/logout', authController.logout);

// Route for checking who is logged into system 
router.get('/active-user', authController.getActiveUsers);


// Route for verifying 2FA code
//router.post('/verify-2fa', authController.verify2FA);
router.post('/verify-2fa', authController.enable2FA);

// Route to get all users
router.get('/users', authController.getAllUsers);

// Route to delete a user by ID
router.delete('/delete/:userId', authController.deleteUserById);

// Route for protected data (e.g., /api/protected-route)
router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});





/**
// Route to create the admin account (admin is unique; RUN ONLY ONCE)
router.post('/create-admin', async (req, res) => {
    const { username, password } = req.body;

    try {
        // Check if an admin already exists
        const existingAdmin = await Admin.findOne({ role: 'admin' });
        if (existingAdmin) {
            return res.status(400).json({ message: 'Admin account already exists' });
        }

        // Create new admin account
        const admin = new Admin({ username, password, role: 'admin' });
        await admin.save();

        res.status(201).json({ message: 'Admin account has been created' });
    } catch (error) {
        console.error('Error creating admin account:', error);
        res.status(500).json({ message: 'Error creating admin account' });
    }
});

// Route for user and admin login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        // 1st: check if the username is already associated with an admin account
        const admin = await Admin.findOne({ username });
        if (admin && await admin.matchPassword(password)) {
            // Generate admin token
            const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
                expiresIn: '1h',
            });
            return res.json({ token, role: admin.role, message: 'Admin logged in successfully' });
        }

        // If not admin, proceed to a regular user login
        const user = await authController.login(username, password);
        if (!user) {
            return res.status(400).json({ message: 'Invalid username or password' });
        }

        // Generate user token
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token, role: user.role, message: 'User logged in successfully' });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
});
*/

// Endpoint to enable 2FA
router.post('/enable-2fa', async (req, res) => {
    const { userId } = req.body; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate the 2FA secret for the user
        const secret = user.generate2FASecret();

        // Save the user with the new 2FA secret
        await user.save();

        // Return the 2FA secret 
        res.json({
            message: '2FA enabled successfully',
            secret: secret.base32,
            otpauthUrl: secret.otpauth_url
        });
    } catch (error) {
        console.error('Error enabling 2FA:', error);
        res.status(500).json({ message: 'Failed to enable 2FA' });
    }
});

// Endpoint to verify the 2FA code
router.post('/verify-2fa', async (req, res) => {
    const { userId, token } = req.body; // Get userId and the token entered by the user

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (!user.twoFASecret) {
            return res.status(400).json({ message: '2FA is not enabled' });
        }

        // Verify the token against the stored 2FA secret
        const verified = speakeasy.totp.verify({
            secret: user.twoFASecret, // The secret we stored earlier
            encoding: 'base32',
            token: token, // The token the user entered
            window: 1 // Allow a small window for time drift (optional)
        });

        if (verified) {
            res.json({ message: '2FA code verified successfully' });
        } else {
            res.status(400).json({ message: 'Invalid 2FA code' });
        }
    } catch (error) {
        console.error('Error verifying 2FA code:', error);
        res.status(500).json({ message: 'Failed to verify 2FA code' });
    }
});

module.exports = router;