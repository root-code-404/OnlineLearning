const { ObjectId } = require('mongodb');
const x = require('../db'); // Import your database connection

const createCourse = async (req, res) => {
    try {
        const db = await x();
        const course = req.body;

        if (req.file) {
            course.image = req.file.filename; // Store the image file name in the course object
        }

        const result = await db.collection('courses').insertOne(course);
        res.json({ message: 'Course added successfully', courseId: result.insertedId });
    } catch (error) {
        console.error('Error storing image:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { createCourse };
