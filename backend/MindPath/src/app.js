// app.js - Must resolve all conflicts with existing app.js when merging pull requests

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const adminRoutes = require('../routes/admin'); // Import the admin routes

// Middleware to handle requests
app.use(express.json());

// Other routes
app.use('/api/admin', adminRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mindpath', { useNewUrlParser: true, useUnifiedTopology: true }) //TODO: replace generic localhost
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB', err));

// Initialize the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
