import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressNotes = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', content: '' });

    useEffect(() => {
        fetchNotes();
    }, []);

    const fetchNotes = async () => {
        try {
            const response = await axios.get('/api/progress-notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to obtain notes:', error);
        }
    };