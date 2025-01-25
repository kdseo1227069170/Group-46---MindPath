const verifyUser = (req, res, next) => {
    // No 2FA is implemented fully yet. This is a temporary bypass to login as verified user
    console.log('Temporary verifyUser middleware. The authentication is bypassed, FYI');

    // Mock user
    req.user = {
        id: 'username',
        username: 'username',
    };

    // Proceeds to the next middleware or route
    next();
};

module.exports = verifyUser;
