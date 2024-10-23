// routes.js

const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

// Define a route to add a course to the user's cart using POST
router.post('/cart', cartController.addToCart);
// routes.js

// Define a route to remove a course from the user's cart using POST
router.post('/remove', cartController.removeFromCart);



module.exports = router;
