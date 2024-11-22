const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController');
const Admin = require('../models/adminModel'); //for the Admin user
const { body, validationResult } = require('express-validator');

// Validation middleware for registering a user
const validateRegister = [
    body('firstName').not().isEmpty().withMessage('First name is required'),
    body('lastName').not().isEmpty().withMessage('Last name is required'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phoneNumber').isMobilePhone().withMessage('Please enter a valid phone number')
];

// Validation middleware for logging in a user
const validateLogin = [
    body('email').isEmail().withMessage('Please enter a valid email address'),
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
        return res.status(400).json({ errors: errors.array() }); // Send validation errors
    }
    next();
}, authController.login);



// Route for verifying 2FA code
router.post('/verify-2fa', authController.verify2FA);

// Route to get all users
router.get('/users', authController.getAllUsers);

// Route to delete a user by ID
router.delete('/delete/:userId', authController.deleteUserById);


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

module.exports = router;