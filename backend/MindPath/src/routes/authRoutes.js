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



// Route to get all users
router.get('/users', authController.getAllUsers);

// Route to delete a user by ID
router.delete('/delete/:userId', authController.deleteUserById);

// Route for protected data (e.g., /api/protected-route)
router.get('/protected-route', verifyToken, (req, res) => {
    res.json({ message: 'This is protected data', user: req.user });
});


// Endpoint to enable 2FA
router.post('/enable2FA', async (req, res) => {
    const { userId } = req.body; 

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate the 2FA secret for the user
		const secret = speakeasy.generateSecret();
        //const secret = user.generate2FASecret();

        // Save the user with the new 2FA secret
		user.twoFASecret = secret.base32; // Store the secret
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
router.post('/verify2FA', async (req, res) => {
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