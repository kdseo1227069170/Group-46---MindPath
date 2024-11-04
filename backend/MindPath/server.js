const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./src/routes/auth');
const app = express(); //admin dashboard
const dashboardRoutes = require('./backend/routes/admin'); //admin dashboard
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json()); //for admin dashboard
app.use('/api/admin', dashboardRoutes); //for admin dashboard
app.use(bodyParser.json());

//mongoose.connect('mongodb://localhost:27017/mindpath')     //Galin: I added environment variables that lead to this URL instead. Uncomment this if that creates a problem
	//.then(() => console.log('MongoDB connected'))
	//.catch((err) => console.log(err));

mongoose.connect(process.env.MONGO_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
})
	.then(() => console.log('MongoDB connected'))
	.catch((err) => console.log(err));
	
	
	app.use('/api/auth', authRoutes);
	app.use('/api/admin', dashboardRoutes);

//start the server
	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
	
