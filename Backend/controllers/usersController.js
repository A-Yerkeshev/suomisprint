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
    res.status(500).json({error: `Failed register user. Error: ${err}`});
  }
}

// PATCH /api/courses/:id
const update = async (req, res) => {
  const {id} = req.params;

  let {title,
    providerId,
    description,
    shortDescription,
    level,
    price,
    imageUrl,
    maxStudents,
    startDate,
    endDate,
    startTime,
    endTime} = req.body;

  // Validate data types
  try {
    if (price) { price = parseFloat(price); }
  } catch(err) {
    res.status(400).json({error: `Failed to convert price/maxStudents/startTime/endTime into a number. Error: ${err}`});
    return;
  }

  try {
    if (startDate && typeof startDate === "string") { startDate = new Date(startDate); }
    if (endDate && typeof endDate === "string") { endDate = new Date(endDate); }

  } catch(err) {
    res.status(400).json({error: `Failed to convert startDate/endDate to date. Error: ${err}`});
    return;
  }

  if (providerId && !validId(providerId)) {
    res.status(400).json({error: `${providerId} is not valid value for providerId.`});
    return;
  }

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid course id.`});
    return;
  }

  // Update course
  try {
    const payload = toUnderscoreCase({
      title,
      providerId,
      description,
      shortDescription,
      level,
      price,
      imageUrl,
      maxStudents,
      startDate,
      endDate,
      startTime,
      endTime
    });

    const course = await Course.findOneAndUpdate({_id: id}, payload, {new: true});

    if (!course) {
      res.status(404).json({error: `Course with id ${id} was not found.`});
      return;
    }

    res.status(200).json(toCamelCase(course.toObject()));
  } catch (err) {
    res.status(500).json({error: `Failed to save updates to the course. Error: ${err}`});
  }
}

// DELETE /api/courses/:id
const remove = async (req, res) => {
  const {id} = req.params;

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid course id.`});
    return;
  }

  const course = await Course.findOneAndDelete({_id: id})

  if(!course) {
    res.status(404).json({error: `Course with id ${id} was not found.`});
    return;
  }

  res.status(200).json(toCamelCase(course.toObject()));
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
  list,
  get,
  create,
  delete: remove,
  update
}