// src/routes/progressNotes.js
//routing module for the customer's Progress/Personal Notes
const express = require('express');
const router = express.Router();
const ProgressNote = require('../models/ProgressNote');
const verifyUser = require('../middlewares/verifyUser'); // Middleware for user authentication

// Add a new note
router.post('/', verifyUser, async (req, res) => {
    const { title, content } = req.body;
    try {
        const note = new ProgressNote({
            userId: req.user.id,
            title,
            content,
        });
        await note.save();
        res.status(201).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Failed to save note', error });
    }
});

// Get all notes for a user
router.get('/', verifyUser, async (req, res) => {
    try {
        const notes = await ProgressNote.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.status(200).json(notes);
    } catch (error) {
        res.status(500).json({ message: 'Error obtaining notes', error });
    }
});

// Edit a note
router.put('/:id', verifyUser, async (req, res) => {
    try {
        const note = await ProgressNote.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            { title: req.body.title, content: req.body.content },
            { new: true }
        );
        if (!note) return res.status(404).json({ message: 'Note not found' });
        res.status(200).json(note);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update note', error });
    }
});

// Delete a note
router.delete('/:id', verifyUser, async (req, res) => {
    try {
        const note = await ProgressNote.findOneAndDelete({
            _id: req.params.id,
            userId: req.user.id,
        });
        if (!note) return res.status(404).json({ message: 'Note was not found' });
        res.status(200).json({ message: 'Note successfully deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Failed to delete the note', error });
    }
});

module.exports = router;US