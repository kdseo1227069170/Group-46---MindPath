const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./src/routes/auth');

const app = express();

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/mindpath')
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));
	
	
	app.use('/api/auth', authRoutes);
	
	//start the server
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	