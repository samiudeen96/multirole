const db = require('../config/db');

const user = {
    create: (username, password, role_id, callback) => {
        const query = 'INSERT INTO users (username, password, role_id) VALUES (?, ?, ?)';
        db.query(query, [username, password, role_id], callback);
    },
    findByUsername: (username, callback) => {
        const query = 'SELECT * FROM users WHERE username = ?';
        db.query(query, [username], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = user;
