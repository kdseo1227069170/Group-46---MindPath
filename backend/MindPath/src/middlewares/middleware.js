const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const blacklist = [];
const activeUsers = {}; // In-memory session storage (you might want to use something like Redis in production)

const SESSION_TIMEOUT = 15 * 60 * 1000; // 15 minutes of inactivity

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'Authorization header is required' });
    }

    const token = authHeader.split(' ')[1];
    if (!token || blacklist.includes(token)) {
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;

        // Enforce inactivity timeout
        const userId = decoded.userId;
        const userSession = activeUsers[userId];

        if (userSession) {
            const now = Date.now();
            if (now - userSession.lastActivity > SESSION_TIMEOUT) {
                // Invalidate the session if inactive for too long
                delete activeUsers[userId];
                return res.status(401).json({ message: 'Session expired due to inactivity. Please log in again.' });
            }

            // Update last activity time to prevent session timeout
            userSession.lastActivity = now;
        } else {
            return res.status(401).json({ message: 'Session not found. Please log in again.' });
        }

        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Token verification failed' });
    }
};

module.exports = { verifyToken };