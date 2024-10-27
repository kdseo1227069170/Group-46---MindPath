const express = require('express');
const router = express.Router();

router.get('/dashboard', async (req, res) => {
    try {
        // Get aggregate stats (here, total users and searches)
        const totalUsers = await User.countDocuments();
        const totalSearches = await SearchLog.countDocuments();

        res.json({
            totalUsers,
            totalSearches,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error: unable to fetch updated dashboard data' });
    }
});

module.exports = router;

//Ensure only admin privileges get access to view the dashboard
const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied' });
    }
};

// TODO: Apply middleware to route
router.get('/dashboard', verifyAdmin, async (req, res) => {
    // TODO: Dashboard logic
});
