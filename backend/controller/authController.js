const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const user = require('../model/user');
const db = require('../config/db');
require('dotenv').config();

exports.register = (req, res) => {
    const { username, password, role_id } = req.body;

    if (!username || !password || !role_id) {
        return res.status(400).send('Please provide username, password, and role_id');
    }

    // Check if the role_id exists in the roles table
    const query = 'SELECT * FROM roles WHERE id = ?';
    db.query(query, [role_id], (err, roles) => {
        if (err) {
            console.error('Error finding role:', err);
            return res.status(500).send('Error finding role');
        }
        if (roles.length === 0) {
            return res.status(400).send('Invalid role_id');
        }

        // Hash the password and create the user
        bcrypt.hash(password, 10, (err, hash) => {
            if (err) {
                console.error('Error hashing password:', err);
                return res.status(500).send('Error hashing password');
            }

            user.create(username, hash, role_id, (err, result) => {
                if (err) {
                    console.error('Error creating user:', err);
                    return res.status(500).send('Error creating user');
                }
                res.status(201).send('User registered');
            });
        });
    });
};

exports.login = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Please provide username and password');
    }

    user.findByUsername(username, (err, users) => {
        if (err) {
            console.error('Error finding user:', err);
            return res.status(500).send('Error finding user');
        }
        if (users.length === 0) {
            return res.status(400).send('User not found');
        }

        const user = users[0];
        bcrypt.compare(password, user.password, (err, isMatch) => {
            if (err) {
                console.error('Error comparing password:', err);
                return res.status(500).send('Error comparing password');
            }
            if (!isMatch) {
                return res.status(400).send('Incorrect password');
            }

            const token = jwt.sign({ id: user.id, role_id: user.role_id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ token });
        });
    });
};


exports.logout = (req, res) => {
    // No server-side action needed for JWT logout (stateless)
    res.status(200).send('Logged out successfully');
};