const db = require('../config/db');

const role = {
    getAll: (callback) => {
        const query = 'SELECT * FROM roles';
        db.query(query, callback);
    },
    findById: (id, callback) => {
        const query = 'SELECT * FROM roles WHERE id = ?';
        db.query(query, [id], callback);
    }
}

module.exports = role;