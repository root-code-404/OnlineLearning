// authRoutes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// This is a protected route that requires authentication
router.get('/user', userController.getUserDetails);

module.exports = router;
