const mysql = require('mysql2');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// MySQL Connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    database: 'socialmedia'
});

db.connect(err => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to database.');
});

// User model methods
const createUser = async (email, password, callback) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], callback);
    } catch (error) {
        callback(error);
    }
};

const findUserByEmail = (email, callback) => {
    db.query('SELECT * FROM users WHERE email = ?', [email], callback);
};

const generateToken = (userId) => {
    return jwt.sign({ id: userId }, "HJKJFIOEC", { expiresIn: '1h' });
};

module.exports = { createUser, findUserByEmail, generateToken };
