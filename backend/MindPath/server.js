const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const dashboardRoutes = require('./src/routes/admin'); // Use the correct path for admin dashboard routes
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Route Definitions
app.use('/api/auth', authRoutes); 
app.use('/api/admin', dashboardRoutes); // Add the dashboard route here

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));

// Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
