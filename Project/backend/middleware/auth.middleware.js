const jwt = require('jsonwebtoken');

// Middleware to authenticate the token
function authenticateToken(req, res, next) {
    // Get token from Authorization header
    const token = req.headers['authorization']?.split(' ')[1]; // Assumes format: "Bearer token"
    
    if (!token) {
        return res.sendStatus(401); // Unauthorized if no token is provided
    }

    // Verify the token
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) {
            return res.sendStatus(403); // Forbidden if token is invalid
        }
        req.user = user; // Attach user data to req
        console.log('req.user',user)
        next(); // Proceed to the next middleware or route handler
    });
}

// Middleware to verify if the user is an admin
function verifyAdmin(req, res, next) {
    if (req.user.role !== 'admin') {
        return res.sendStatus(403); // Forbidden if user is not an admin
    }
    next(); // Proceed to the next middleware or route handler
}

module.exports = { authenticateToken, verifyAdmin };
