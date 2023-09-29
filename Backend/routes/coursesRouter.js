const express = require('express');
const coursesController = require('../controllers/coursesController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

// GET all courses
router.get('/courses/', coursesController.list)

// GET a single course
router.get('/courses/:id', coursesController.get)

// POST a new course
router.post('/courses/', coursesController.create)

// DELETE a course
router.delete('/courses/:id', coursesController.delete)

// Update course
router.patch('/courses/:id', coursesController.update)

//enroll in a course
router.post('/courses/enroll/:id', protect, coursesController.enroll);

//get my courses
router.get('/mycourses', protect, coursesController.myCourses);

module.exports = router