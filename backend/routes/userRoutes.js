const express = require('express');
const { verifyToken, isAdmin, isUser } = require('../middleware/auth');
const user = require('../model/user');
const router = express.Router();

router.get('/profile', verifyToken, (req, res) => {
    user.findById(req.userId, (err, users) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Error finding user');
        }
        if (users.length === 0) {
            return res.status(404).send('User not found');
        }
        res.json(users[0]);
    });
});

router.get('/admin', verifyToken, isAdmin, (req, res) => {
    res.send('Welcome Admin');
});

router.get('/user', verifyToken, isUser, (req, res) => {
    res.send('Welcome User');
});

module.exports = router;