const User = require('../models/userModel');
const mongoose = require('mongoose');

// POST /api/users
const register = async (req, res) => {
  let { name, email, phone, role=0 } = req.body;

  // Validate presence of data
  if (!name || !email) {
    res.status(400).json({error: "User must have a name and email."});
    return;
  }

  // Validate data types
  try {
    if (typeof role === 'string') { role = parseInt(role); }
  } catch(err) {
    res.status(400).json({error: `Failed to convert role into an integer. Error: ${err}`});
    return;
  }

  // Check that user with this email does not exist
  const user = await User.findOne({email});

  if (user) {
    res.status(400).json({error: `User with email ${email} already registered.`});
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

// PATCH /api/users/:id
const update = async (req, res) => {
  const {id} = req.params;
  let { name, email, phone, role } = req.body;

  // Validate data types
  try {
    if (role) { role = parseInt(role); }
  } catch(err) {
    res.status(400).json({error: `Failed to convert role into an integer. Error: ${err}`});
    return;
  }

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid user id.`});
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

// DELETE /api/users/:id
const remove = async (req, res) => {
  const {id} = req.params;

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid user id.`});
    return;
  }

  const user = await User.findOneAndDelete({_id: id})

  if(!user) {
    res.status(404).json({error: `Failed to delete the user.`});
    return;
  }

  res.status(200).json(toCamelCase(user.toObject()));
}

// POST /api/users/login
const login = async (req, res) => {
  let { name, email } = req.body;


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
    if (val !== undefined) {
      const underscored = key.replace(/(?:^|\.?)([A-Z])/g, (x,y) => ("_" + y.toLowerCase())).replace(/^_/, "");
      res[underscored] = val;
    }
  }

  return res;
}

const toCamelCase = (obj) => {
  const res = {};

  for (const [key, val] of Object.entries(obj)) {
    if (val !== undefined) {
      const camelCased = key.replace(/_([a-z])/g, (g) => (g[1].toUpperCase()));
      res[camelCased] = val;
    }
  }

  return res;
}

module.exports = {
  register,
  delete: remove,
  update,
  login
}