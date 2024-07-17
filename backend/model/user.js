const db = require('../config/db');

const user = {
    create: (name, email, password, role_id, callback) => {
        const query = 'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)';
        db.query(query, [name, email, password, role_id], callback);
    },
    findByEmail: (email, callback) => {
        const query = 'SELECT * FROM users WHERE email = ?';
        db.query(query, [email], callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ?';
        db.query(query, [id], callback);
    }
};

module.exports = user;
