const express = require('express');
const router = express.Router();
const verifyAdmin = require('../middlewares/verifyAdmin');
const SearchLog = require('../models/SearchLog');
const User = require('../models/User');

router.get('/dashboard', verifyAdmin, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalSearches = await SearchLog.countDocuments();
        const searchesPerDay = await SearchLog.aggregate([
            {
                $group: {
                    _id: { $dateToString: { format: "%Y-%m-%d", date: "$searchDate" } },
                    totalSearches: { $sum: 1 }
                }
            },
            { $sort: { _id: 1 } }
        ]);

        const popularSearches = await SearchLog.aggregate([
            { $group: { _id: "$searchTerm", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 5 }
        ]);

        res.json({
            totalUsers,
            totalSearches,
            searchesPerDay,
            popularSearches
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error: unable to fetch updated dashboard data' });
    }
});

module.exports = router;
