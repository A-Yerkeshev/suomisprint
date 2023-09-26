const express = require('express');
const usersController = require('../controllers/usersController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// Register new user
router.post('/', usersController.register);

// Update user
router.patch('/', protect, usersController.update);

// Delete user
router.delete('/', protect, usersController.delete);

// Login
router.post('/login', usersController.login);


module.exports = router