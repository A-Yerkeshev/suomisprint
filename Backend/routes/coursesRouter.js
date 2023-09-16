const express = require('express');
const usersController = require('../controllers/coursesController');

const router = express.Router();

// GET all courses
router.get('/', usersController.list)

// GET a single course
router.get('/:id', usersController.get)

// POST a new course
router.post('/', usersController.create)

// DELETE a course
router.delete('/:id', usersController.delete)

// Update course
router.patch('/:id', usersController.update)

module.exports = router