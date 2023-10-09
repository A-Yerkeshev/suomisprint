const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const Course = require('../models/courseModel');

// Authentication
const authenticate = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch(err) {
      res.status(401).json({error: "Failed to authenticate user from token."});
      return;
    }
  } else {
    res.status(401).json({error: "Token is not provided in authentication header."});
    return;
  }
}

// Authorization
const authorize = async (req, res, next) => {
  const {id} = req.params;

  const course = await Course.findById(id);

  if (!course) {
    res.status(404).json({error: `Course with id ${id} was not found.`});
    return;
  }

  if (String(req.user._id) != String(course.provider_id)) {
    res.status(401).json({error: 'Unauthorized for this action'});
    return;
  }

  next();
}

module.exports = { authenticate, authorize };