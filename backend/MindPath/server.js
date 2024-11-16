const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
//const app = express(); //admin dashboard ###This is declared twice, marked out by Galin on 11/15.
const dashboardRoutes = require('./backend/src/admin/dashboard'); //admin dashboard


const app = express();
app.use(cors());
app.use(express.json()); //for admin dashboard
app.use('/api/admin/dashboard', dashboardRoutes); //for admin dashboard
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mindpath')
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));
	
	
app.use('/api/auth', authRoutes);
	
//start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	
