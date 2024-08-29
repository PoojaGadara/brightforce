const db = require('./userModel');

const createPost = (title, description, platform, mediaPaths, callback) => {
    const query = 'INSERT INTO posts (title, description, platform, media) VALUES (?, ?, ?, ?)';
    db.query(query, [title, description, JSON.stringify(platform), JSON.stringify(mediaPaths)], callback);
};

module.exports = { createPost };
