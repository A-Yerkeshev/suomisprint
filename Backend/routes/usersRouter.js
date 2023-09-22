const express = require('express');
const usersController = require('../controllers/usersController');

const router = express.Router();

// Register new user
router.post('/', usersController.register);

// Update user
router.patch('/:id', usersController.update);

// Delete user
router.delete('/:id', usersController.delete);

// Login
router.post('/login', usersController.login);


module.exports = router