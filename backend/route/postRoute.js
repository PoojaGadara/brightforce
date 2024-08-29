const express = require('express');
const multer = require('multer');
const { check } = require('express-validator');
const { createPostHandler } = require('../controller/postController');

const router = express.Router();

// Multer configuration for file uploads
const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, 'uploads/');
        },
        filename: function (req, file, cb) {
            cb(null, Date.now() + '-' + file.originalname);
        }
    }),
    limits: { fileSize: 400 * 1024 * 1024 }, // 400MB limit
    fileFilter: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'video/mp4') {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type, only JPEG, PNG, and MP4 is allowed!'), false);
        }
    }
});

router.post('/post', upload.array('media', 10), [
    check('title').notEmpty().withMessage('Title is required'),
    check('description').notEmpty().withMessage('Description is required'),
    check('platform').isArray().withMessage('Platform must be an array')
], createPostHandler);

module.exports = router;
