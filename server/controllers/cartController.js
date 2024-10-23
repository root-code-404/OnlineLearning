const { ObjectId } = require('mongodb');
const x = require('../db'); // Import your database connection
const addToCart = async (req, res) => {
  const { courseId } = req.body; // Assuming courseId is the course identifier

  try {
    const db = await x(); // Assuming this function sets up your database connection
    const cartCollection = db.collection('cart');

    // Check if a cart item with the same userId and courseId exists
    const user = req.session.user;
    const existingCartItem = await cartCollection.findOne({ userId: new ObjectId(user._id), courseId: new ObjectId(courseId) });

    if (existingCartItem) {
      return res.status(400).json({ error: 'Course is already in the cart' });
    }

    // Fetch the course details from your 'courses' collection
    const courseCollection = db.collection('courses');
    const course = await courseCollection.findOne({ _id: new ObjectId(courseId) });

    if (!course) {
      return res.status(404).json({ error: 'Course not found' });
    }

    // Create a new cart item
    const cartItem = {
      userName: user.name,
      userEmail: user.email,
      userId: new ObjectId(user._id),
      courseId: new ObjectId(courseId),
      name: course.name,
      category: course.category,
      image: course.image,
      // Add more fields from courseData if needed
    };

    // Insert the cart item into the 'cart' collection
    const result = await cartCollection.insertOne(cartItem);

    if (result.insertedCount === 1) {
      res.json({ message: 'Course added to cart', courseId: result.insertedId });
    } else {
      res.status(500).json({ error: 'Error adding course to cart' });
    }
  } catch (error) {
    console.error('Error adding course to cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


// Remove a course from the cart
const removeFromCart = async (req, res) => {
  const { courseId } = req.body; // Assuming courseId is the course identifier

  try {
    const db = await x(); // Assuming this function sets up your database connection
    const id = req.session.user._id;
   
    // Find and remove the course from the cart
    const result = await db.collection('cart').deleteOne({ userId: new ObjectId(id) });
    console.log(result)
      

    if (result.deletedCount === 1) {
      res.json({ message: 'Course removed from cart', courseId: courseId });
    } else {
      res.status(404).json({ error: 'Course not found in the cart' });
    }
  } catch (error) {
    console.error('Error removing course from cart:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};


module.exports = {
  addToCart,removeFromCart
};
