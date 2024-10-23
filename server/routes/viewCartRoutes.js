
// viewcourseRoutes.js

const express = require('express');
const router = express.Router();

const viewCartController = require('../controllers/viewCartController');


router.get('/courses/:id', viewCartController.getCourse);

module.exports = router;
