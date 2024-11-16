// Route to handle feedback submission. Feedback.js is under models; feedback.js is under routes

const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');

router.post('/', async (req, res) => {
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

module.exports = router;