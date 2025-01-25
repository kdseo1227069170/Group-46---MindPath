//temporary seed data to populate website statistics (fake) data. Keep and then delete in the backend root directory: backend/MindPath

const mongoose = require('mongoose');
const User = require('./src/models/User');
const SearchLog = require('./src/models/SearchLog');

mongoose.connect('mongodb://localhost:27017/mindpath', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.error('MongoDB connection error:', err));

const seedUsers = async () => {
    await User.deleteMany(); // Clears the collection
    const users = [
        { username: 'testuser1', lastLogin: new Date() },
        { username: 'testuser2', lastLogin: new Date() },
    ];
    await User.insertMany(users);
    console.log('Users seeded');
};

const seedSearchLogs = async () => {
    await SearchLog.deleteMany();
    const logs = [
        { searchTerm: 'mental health', searchDate: new Date() },
        { searchTerm: 'therapy', searchDate: new Date() },
    ];
    await SearchLog.insertMany(logs);
    console.log('Search logs seeded');
};

const seedDatabase = async () => {
    await seedUsers();
    await seedSearchLogs();
    mongoose.disconnect();
};

seedDatabase();
