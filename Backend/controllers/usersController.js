const User = require('../models/userModel');
const mongoose = require('mongoose');

// POST /api/users
const register = async (req, res) => {
  let { name, email, phone, role=0 } = req.body;

  // Validate presence of data
  if (!name) {
    res.status(400).json({error: "User must have a name."});
    return;
  }

  // Validate data types
  try {
    if (role) { role = parseInt(role); }
  } catch(err) {
    res.status(400).json({error: `Failed to convert role into an integer. Error: ${err}`});
    return;
  }

  // Save to the database
  try {
    const payload = toUnderscoreCase({
      name,
      email,
      phone,
      role
    });

    const user = await User.create(payload);
    res.status(200).json(toCamelCase(user.toObject()));
  } catch (err) {
    res.status(500).json({error: `Failed to register user. Error: ${err}`});
  }
}

// PATCH /api/courses/:token
const update = async (req, res) => {
  const {token} = req.params;
  // Extract user id from token!
  let { name, email, phone, role } = req.body;

  // Validate presence of data
  if (!name) {
    res.status(400).json({error: "User must have a name."});
    return;
  }

  // Validate data types
  try {
    if (role) { role = parseInt(role); }
  } catch(err) {
    res.status(400).json({error: `Failed to convert role into an integer. Error: ${err}`});
    return;
  }

  // Update course
  try {
    const payload = toUnderscoreCase({
      name,
      email,
      phone,
      role
    });

    const user = await User.findOneAndUpdate({_id: id}, payload, {new: true});

    res.status(200).json(toCamelCase(user.toObject()));
  } catch (err) {
    res.status(500).json({error: `Failed to update the user. Error: ${err}`});
  }
}

// DELETE /api/courses/:token
const remove = async (req, res) => {
  const {token} = req.params;
  // Extract user id from token!

  const user = await User.findOneAndDelete({_id: id})

  if(!user) {
    res.status(404).json({error: `Failed to delete the user.`});
    return;
  }

  res.status(200).json(toCamelCase(user.toObject()));
}

const validId = (id) => {
  ObjectId = mongoose.Types.ObjectId;

  if (ObjectId.isValid(id)) {
    if (String(new ObjectId(id)) === id) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

const toUnderscoreCase = (obj) => {
  const res = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val) {
      const underscored = key.replace(/(?:^|\.?)([A-Z])/g, (x,y) => ("_" + y.toLowerCase())).replace(/^_/, "");
      res[underscored] = val;
    }
  }

  return res;
}

const toCamelCase = (obj) => {
  const res = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val) {
      const camelCased = key.replace(/_([a-z])/g, (g) => (g[1].toUpperCase()));
      res[camelCased] = val;
    }
  }

  return res;
}

module.exports = {
  register,
  delete: remove,
  update
}