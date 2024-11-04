// Middleware to ensure it is Admin privilege that is accessing the dashboard

const jwt = require('jsonwebtoken');

const verifyAdmin = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Access denied. No token was provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Incorrect admin login.' });
        }
        req.user = decoded; // Attach decoded token to request for further usage
        next();
    } catch (error) {
        res.status(400).json({ message: 'Invalid token.' });
    }
};

module.exports = verifyAdmin;
