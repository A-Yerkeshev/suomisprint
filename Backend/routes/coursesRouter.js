const express = require('express');
const coursesController = require('../controllers/coursesController');
const { protect } = require('../middleware/authMiddleware');


const router = express.Router();

// GET all courses
router.get('/', coursesController.list)

// GET a single course
router.get('/:id', coursesController.get)

// POST a new course
router.post('/', coursesController.create)

// DELETE a course
router.delete('/:id', coursesController.delete)

// Update course
router.patch('/:id', coursesController.update)

//enroll in a course
router.post('/enroll/:id', protect, coursesController.enroll);

module.exports = router