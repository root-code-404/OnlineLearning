// courseController.js
const { ObjectId } = require('mongodb');

const x = require('../db');

const updateCourse  = async (req, res) => {
    const id = req.params.id;
  const updatedCourse = req.body;

  try {
    const db = await x();
    const result = await db.collection('courses').updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          name: updatedCourse.name,
          desc: updatedCourse.desc,
          category: updatedCourse.category,
          image: updatedCourse.image
        }
      }
    );

    if (result.modifiedCount > 0) {
      console.log(`Updated ${result.modifiedCount} document(s)`);
      res.json({ message: 'Category details updated successfully' });
    } else {
      console.error('Course not found');
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error('Error updating course details:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}


module.exports = {
  updateCourse ,
    
};
