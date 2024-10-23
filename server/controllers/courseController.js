// courseController.js

const x = require('../db');

const getAllCourses = async (req, res) => {
    try {
        const db = await x();
        const courses = await db.collection('courses').find({}).toArray();
        res.json(courses);
    } catch (error) {
        console.error('Error fetching courses:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



module.exports = {
    getAllCourses,
    
};
