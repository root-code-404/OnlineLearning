// getcartController.js

const { ObjectId } = require('mongodb'); // Assuming you use MongoDB
const db = require('../db'); // Import your database connection

const getCart = async (req, res) => {
  try {
    const userId = req.session.user._id; // Assuming you store the user's ID in the session
    const dbInstance = await db(); // Establish a database connection

    // Fetch cart items for the user
    const cartCollection = dbInstance.collection('cart');
    const cartItems = await cartCollection.find({ userId: new ObjectId(userId) }).toArray();

    // Send the cart items to the client
    res.json({ cartItems });
  } catch (error) {
    console.error('Error fetching cart items:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getCart,
};
