const express = require('express');
const coursesController = require('../controllers/coursesController');
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { checkPermissions } = require('../middleware/roleMiddleware');


const router = express.Router();

// GET all courses
router.get('/courses/', coursesController.list)

// GET a single course
router.get('/courses/:id', coursesController.get)

// POST a new course
router.post('/courses/', authenticate, checkPermissions, coursesController.create)

// DELETE a course
router.delete('/courses/:id', authenticate, authorize, checkPermissions, coursesController.delete)

// Update course
router.patch('/courses/:id', authenticate, authorize, checkPermissions, coursesController.update)

//enroll in a course
router.post('/courses/enroll/:id', authenticate, coursesController.enroll);

//check if enrolled
router.get('/courses/enroll/:id', authenticate, coursesController.isEnrolled);

// Cancel enrollment
router.delete('/courses/enroll/:id', authenticate, coursesController.cancelEnrollment);

//get my courses
router.get('/mycourses', authenticate, coursesController.myCourses);

module.exports = router