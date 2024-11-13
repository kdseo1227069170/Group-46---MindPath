const express = require('express')
const router = express.Router()
const {registerUser,loginUser} = require('../controllers/authController.js');
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
        return res.status(400).json({ errors: errors.array() }); // Send validation errors
    }
    next();
}, registerUser);

// @route   POST /api/auth/login
// @desc    Login user
// @access  Public
router.post('/login', validateLogin, (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() }); // Send validation errors
    }
    next();
}, loginUser);

module.exports = router;