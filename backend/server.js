const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');

// Load environment variables 
dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI;
const authRoutes = require('./routes/authRoutes');

app.set('view engine', 'ejs');

// Middleware
app.use(express.json());  
app.use(cors());   

// Routes
app.use('/api/auth', authRoutes);

// Connect to MongoDB
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error(err));

// basic test for the server
app.get('/', (req, res) => {
  res.send("MindPath API is running...")
});


// Define the port 
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
