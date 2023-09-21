const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Register new user
router.post('/', usersController.register)

// Update user
router.patch('/:token', usersController.update)

// Delete user
router.delete('/:token', usersController.delete)

// Login


// Logout


module.exports = router