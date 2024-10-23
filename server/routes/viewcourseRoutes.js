// viewcourseRoutes.js

const express = require('express');
const router = express.Router();

const viewcourseController = require('../controllers/viewcourseController');


router.get('/courses/:id', viewcourseController.getCourse);

module.exports = router;
