const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
//const authRoutes = require('./src/routes/auth');
//const dashboardRoutes = require('./src/routes/admin'); //admin dashboard; commented out due to merge conflict with dev
//const feedbackRoutes = require('./src/routes/feedback'); //feedback form; commented out due to merge conflict with dev
const authRoutes = require('./src/routes/authRoutes');
const dashboardRoutes = require('./src/routes/admin'); 
const sessionTimeoutMiddleware = require('./src/middlewares/middleware');
require('dotenv').config();


const app = express();

// Middleware
app.use(cors());
app.use(express.json()); //for admin dashboard
app.use('/api/admin', dashboardRoutes); //for admin dashboard
app.use('/api/feedback', feedbackRoutes); //for feedback form
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
