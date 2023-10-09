const express = require('express');
const usersController = require('../controllers/usersController');
const { authenticate } = require('../middleware/authMiddleware');

const router = express.Router();

// Register new user
router.post('/', usersController.register);

// Update user
router.patch('/', authenticate, usersController.update);

// Delete user
router.delete('/', authenticate, usersController.delete);

// Login
router.post('/login', usersController.login);


module.exports = router