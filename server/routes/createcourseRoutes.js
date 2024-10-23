const express = require('express');
const router = express.Router();
const createcourseController = require('../controllers/createcourseController');

const multer = require('multer');
const path = require('path');

// Define a storage configuration for file uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../../client/public/uploads/'), // Destination folder on the server
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Use the createcourseController for handling the POST request
router.post('/courses', upload.single('image'), createcourseController.createCourse);


module.exports = router;
