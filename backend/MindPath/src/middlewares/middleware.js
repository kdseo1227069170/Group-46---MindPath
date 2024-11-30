const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_jwt_secret';
const blacklist = []; // Replace with Redis or persistent store in production

// Middleware to check token validity
exports.verifyToken = (req, res, next) => {
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
        req.user = decoded; // Attach decoded payload to the request
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        return res.status(401).json({ message: 'Token verification failed' });
    }
};
