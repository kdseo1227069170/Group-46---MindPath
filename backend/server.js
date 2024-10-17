const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables 
dotenv.config();

const app = express();

// Middleware
app.use(express.json());  
app.use(cors());          

// testing the server
app.get('/', (req, res) => {
  res.send('MindPath API is running...');
});



// Define the port 
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
