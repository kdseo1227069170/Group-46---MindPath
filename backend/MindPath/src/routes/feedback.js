// Route to handle feedback submission. Feedback.js is under models; feedback.js is under routes

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const verifyAdmin = require('../middlewares/verifyAdmin'); // Import the verifyAdmin middleware
const { verifyToken } = require('../middlewares/middleware'); // Added by Galin. 

//Protect the feedback submission route. 
router.post('/', verifyToken, async (req, res) => {
    try {
        const { rating, comments } = req.body;
        const feedback = new Feedback({ rating, comments });
        await feedback.save();
        res.status(201).json({ message: 'Feedback submitted successfully' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ message: 'Error submitting feedback' });
    }
});

// ADMIN-ONLY: this route retrieves the feedback form to view
router.get('/', verifyAdmin, async (req, res) => {
// Galin commented this line out and uncommented the upper one. This way only the admin is able to see feedback.
// If the feedback should be visible for anyone, the upper line should be commented out and the one below should be uncommented.
//router.get('/', async (req, res) => { 
    try {
        const feedbacks = await Feedback.find().sort({ submittedAt: -1 });
        res.json(feedbacks);
    } catch (error) {
        console.error('Error fetching feedback:', error);
        res.status(500).json({ message: 'Error fetching feedback' });
    }
});

module.exports = router;