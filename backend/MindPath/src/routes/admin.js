// Admin's dashboard route

const express = require('express');
const router = express.Router();
const SearchLog = require('../models/SearchLog'); // Import SearchLog
const User = require('../models/User'); // Import User model (need to make from another task)
const verifyAdmin = require('../middlewares/verifyAdmin'); // Middleware verifies that it's an admin privilege

// For ActivityLog of logging admin's login attempts
const ActivityLog = require('../models/ActivityLog');

// Helpers to aggregate data
const getSearchesPerDay = async () => {
    return await SearchLog.aggregate([
        {
            $group: {
                _id: { $dateToString: { format: "%Y-%m-%d", date: "$searchDate" } },
                totalSearches: { $sum: 1 },
            },
        },
        { $sort: { _id: 1 } } // This sorts by date
    ]);
};

const getPopularSearches = async () => {
    return await SearchLog.aggregate([
        {
            $group: {
                _id: "$searchTerm", // Groups each by search terms
                count: { $sum: 1 }, // Counter for number of terms
            },
        },
        { $sort: { count: -1 } }, // Sort in descending order of # times
        { $limit: 5 } // Cuts to top 5 searches only
    ]);
};

const getActiveUsers = async () => {
    return await User.find({
        lastLogin: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } //Search for users active in last 30 days
    }).countDocuments();
};

// Admin Dashboard route
router.get('/dashboard', verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSearches = await SearchLog.countDocuments();
        const searchesPerDay = await getSearchesPerDay();
        const popularSearches = await getPopularSearches();
        const activeUsers = await getActiveUsers();

        // Log admin access
        const logEntry = new ActivityLog({
            adminId: req.user.id,
            action: 'Accessed Admin Dashboard',
        });
        await logEntry.save();

        res.json({
            totalUsers,
            totalSearches,
            searchesPerDay,
            popularSearches,
            activeUsers,
        });
    } catch (err) {
        console.error('Error retrieving dashboard data:', err);
        res.status(500).json({ message: 'Error updating the dashboard' });
    }
});

module.exports = router;
