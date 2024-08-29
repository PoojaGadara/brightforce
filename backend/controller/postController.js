const { validationResult } = require('express-validator');
const { createPost } = require('../models/postModel');

// Handle form submission with validations
const createPostHandler = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, platform } = req.body;
    const mediaFiles = req.files;

    if (mediaFiles.length === 0) {
        return res.status(400).json({ msg: 'Please upload at least one image or video' });
    }

    const containsVideo = mediaFiles.some(file => file.mimetype === 'video/mp4');
    const containsImage = mediaFiles.some(file => file.mimetype === 'image/jpeg' || file.mimetype === 'image/png');

    if (containsVideo && containsImage) {
        return res.status(400).json({ msg: 'You cannot upload both images and a video' });
    }

    if (containsVideo && mediaFiles.length > 1) {
        return res.status(400).json({ msg: 'You can upload only one video' });
    }

    if (platform.includes('instagram') && mediaFiles.length > 10) {
        return res.status(400).json({ msg: 'You can upload up to 10 images for Instagram' });
    }

    if (platform.includes('twitter') && mediaFiles.length > 4) {
        return res.status(400).json({ msg: 'You can upload up to 4 images for Twitter' });
    }

    const mediaPaths = mediaFiles.map(file => file.path);
    createPost(title, description, platform, mediaPaths, (err, result) => {
        if (err) {
            return res.status(500).json({ msg: 'Error saving post to database' });
        }
        res.status(201).json({ msg: 'Post created successfully' });
    });
};

module.exports = { createPostHandler };
