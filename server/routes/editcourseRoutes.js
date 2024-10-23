// viewcourseRoutes.js

const express = require('express');
const router = express.Router();

const editcourseController = require('../controllers/editcourseController');


// router.get('/courses/:id', editcourseController.getCourse);
router.put('/courses/:id', editcourseController.updateCourse );

module.exports = router;
