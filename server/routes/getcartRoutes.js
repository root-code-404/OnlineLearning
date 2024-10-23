// getcartroutes.js

const express = require('express');
const router = express.Router();
const getcartController = require('../controllers/getcartController');



// Define the route for the cart page
router.get('/cart', getcartController.getCart); // GET request to retrieve cart details

module.exports = router;
