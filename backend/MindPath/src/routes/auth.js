const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route for user registration
router.post('/register', authController.register);

// Route for user login
router.post('/login', authController.login);

// Route for verifying 2FA code
router.post('/verify-2fa', authController.verify2FA);

// Route to get all users
router.get('/users', authController.getAllUsers);

// Route to delete a user by ID
router.delete('/users/username/:username', authController.deleteUserByUsername); 

module.exports = router;