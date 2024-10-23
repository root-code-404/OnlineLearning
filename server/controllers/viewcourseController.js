// courseController.js
const { ObjectId } = require('mongodb');

const x = require('../db');

const getCourse = async (req, res) => {
    const id = req.params.id;
    const db = await x();

    try {
        const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ error: 'Course not found' });
        }
    } catch (error) {
        console.error('Error fetching course details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


module.exports = {
    getCourse,
    
};
