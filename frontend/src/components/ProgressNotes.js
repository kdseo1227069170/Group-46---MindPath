import React, { useState, useEffect } from 'react';
import './ProgressNotes.css'; // Import CSS styling
import axios from 'axios';

const ProgressNotes = () => {
    const [notes, setNotes] = useState([]); // Holds obtained notes
    const [newNote, setNewNote] = useState({ title: '', content: '' }); // Holds new note input
    
    useEffect(() => {
        fetchNotes();
    }, []);

    // Fetch notes from the backend
    const fetchNotes = async () => {
        try {
            const response = await axios.get('/api/progress-notes');
            setNotes(response.data);
        } catch (error) {
            console.error('Failed to obtain notes:', error);
        }
    };

    // Handle Adding a New Note
    const handleAddNote = async () => {
        if (!newNote.title.trim() || !newNote.content.trim()) {
            alert("Please specify a title and content before adding a note.");
            return;
        }

        try {
            const response = await axios.post('/api/progress-notes', newNote);
            setNotes([response.data, ...notes]); // Add new note to the list
            setNewNote({ title: '', content: '' }); // Reset input fields
        } catch (error) {
            console.error('Failed to add note:', error);
        }
    };

    return (
        <div className="progress-notes-container">
            <h1>Progress Notes</h1>

            {/* Adding Note */}
            <div className="note-input">
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <textarea
                    placeholder="Write your note here..."
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
                <button onClick={handleAddNote}>Add Note</button>
            </div>

            {/* Displaying note */}
            <ul className="notes-list">
                {notes.length === 0 ? (
                    <p>No progress notes yet. Start by adding a new note.</p>
                ) : (
                    notes.map((note) => (
                        <li key={note._id} className="note-item">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <small>{new Date(note.createdAt).toLocaleString()}</small>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
};

export default ProgressNotes;