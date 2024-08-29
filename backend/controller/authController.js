const { createUser, findUserByEmail, generateToken } = require('../models/userModel');
const bcrypt = require('bcryptjs');

// User Signup
const signup = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    try {
        await createUser(email, password, (err, result) => {
            if (err) {
                console.log(err)
                return res.status(500).json({ msg: 'Error saving user to database' });
            }
            res.status(201).json({ msg: 'User registered successfully' });
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error registering user' });
    }
};

// User Login
const login = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ msg: 'Please enter all fields' });
    }

    findUserByEmail(email, async (err, results) => {
        if (err || results.length === 0) {
            return res.status(400).json({ msg: 'User not found' });
        }

        const user = results[0];

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid credentials' });
        }

        const token = generateToken(user.id);
        res.json({ token });
    });
};

module.exports = { signup, login };
