const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith('Bearer')) {
    try {
      const token = authHeader.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_KEY);

      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch(err) {
      res.status(401).json({error: "Failed to authenticate user from token."});
    }
  } else {
    res.status(401).json({error: "Token is not provided in authentication header."});
  }
}

module.exports = { protect };