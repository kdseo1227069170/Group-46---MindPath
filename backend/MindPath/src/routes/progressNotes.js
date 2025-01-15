// src/routes/progressNotes.js
//routing module for the customer's Progress/Personal Notes
const express = require('express');
const router = express.Router();
const ProgressNote = require('../models/ProgressNote');
const verifyUser = require('../middleware/verifyUser'); // Middleware for authentication

// Add a new progress note
router.post('/', verifyUser, async (req, res) => {
    try {
        const { note } = req.body;
        const progressNote = new ProgressNote({ userId: req.user.id, note });
        await progressNote.save();
        res.status(201).json({ message: 'Note added successfully' });
    } catch (error) {
        console.error('Error adding note:', error);
        res.status(500).json({ message: 'Error adding note' });
    }
});

// Fetch all notes for the user
router.get('/', verifyUser, async (req, res) => {
    try {
        const notes = await ProgressNote.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(notes);
    } catch (error) {
        console.error('Error fetching notes:', error);
        res.status(500).json({ message: 'Error fetching notes' });
    }
});

module.exports = router;
