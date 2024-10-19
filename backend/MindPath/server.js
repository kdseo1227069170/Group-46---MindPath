const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('../MindPath/src/config/db'); // Update the path according to your structure

// Load environment variables 
dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;
const authRoutes = require('./src/routes/authRoutes'); // Update path if needed

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectDB(mongoURI);

// Routes
app.use('/api/auth', authRoutes);

// Basic test for the server
app.get('/', (req, res) => {
  res.send("MindPath API is running...");
});

// Define the port 
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
