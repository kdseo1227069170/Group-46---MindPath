// Middleware to ensure it is Admin privilege that is accessing the dashboard

const verifyAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).json({ message: 'Access denied: you must be an Admin to view' });
    }
};

module.exports = verifyAdmin;
