const mongoose = require('mongoose')

const connectDB = async (mongoURI) => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Mongo DB...");
    } catch(err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;