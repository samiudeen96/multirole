const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).send('No token provided');
    }

    // Split the token correctly
    const tokenParts = token.split(' ');
    const bearerToken = tokenParts[1]; // Assuming Bearer token format

    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(500).send('Failed to authenticate token');
        }

        req.userId = decoded.id;
        req.roleId = decoded.role_id;
        next();
    });
},
    exports.isAdmin = (req, res, next) => {
        if (req.roleId !== 1) {
            return res.status(403).send('Requires admin role');
        }
        next();

    },
    exports.isUser = (req, res, next) => {
        if (req.roleId !== 2) {
            return res.status(403).send('Requires user role');
        }
        next();
    }