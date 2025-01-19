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

    const handleAddNote = async () => {
        try {
            const response = await axios.post('/api/progress-notes', newNote);
            setNotes([response.data, ...notes]);
            setNewNote({ title: '', content: '' });
        } catch (error) {
            console.error('Failed when adding a note:', error);
        }
    };

    return (
        <div>
            <h1>Progress Notes</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={newNote.title}
                    onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                />
                <textarea
                    placeholder="Write your note here: "
                    value={newNote.content}
                    onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
                />
                <button onClick={handleAddNote}>Add Note</button>
            </div>
            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.content}</p>
                        <small>{new Date(note.createdAt).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProgressNotes;