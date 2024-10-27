const mongoose = require('mongoose');

const connectDB = async () => {
	try{
		
		await mongoose.connect('mongodb://URLAWS' , {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log('MongoDB connected');
	} catch (err) {
		console.error('Error connecting to MongoDB', err);
		process.exit(1);
	}
};

module.exports = connectDB;