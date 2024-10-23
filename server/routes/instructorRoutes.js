// routes/userRoutes.js

const express = require('express');
const router = express.Router();
// const { createUser } = require('../controllers/userController.js');
const { createUser } =  require('./controllers/instructorController')


router.get('/courses/:id', editcourseController.getCourse);

router.post('/register', createUser);

module.exports = router;
