const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// GET /courses
const list = async (req, res) => {
  const courses = await Course.find({}).sort({createdAt: -1});
  res.status(200).json(courses);
}

// GET /courses/:id
const get = async (req, res) => {
  // Your code here
}

// POST /courses
const create = async (req, res) => {
  let {title,
    providerId,
    description,
    shortDescription,
    price,
    imageUrl,
    maxStudents,
    startDate,
    endDate,
    startTime,
    endTime} = req.body;

  // Validate presence of data
  if (!title || !price || !startDate || !endDate || !startTime || !endTime) {
    res.status(400).json({error: "Course must have title, price, startDate, endDate, startTime and endTime properties."});
    return;
  }

  // Validate data types
  try {
    price = parseFloat(price);
  } catch(err) {
    res.status(400).json({error: `Failed to convert price/maxStudents/startTime/endTime into a number. Error: ${err}`});
    return;
  }

  try {
    startDate = new Date(JSON.parse(startDate));
    endDate = new Date(JSON.parse(endDate));
  } catch(err) {
    res.status(400).json({error: `Failed to convert startDate/endDate to date. Error: ${err}`});
    return;
  }

  if (!validId(providerId)) {
    res.status(400).json({error: `${providerId} is not valid value for providerId`});
    return;
  }

  // Save to the database
  try {
    const payload = {
      title,
      provider_id: providerId,
      description,
      short_description: shortDescription,
      image_url: imageUrl,
      price,
      max_students: maxStudents,
      start_date: startDate,
      end_date: endDate,
      start_time: startTime,
      end_time: endTime
    }

    const course = await Course.create(payload);
    res.status(200).json(course);
  } catch (error) {
    res.status(400).json({error: error.message });
  }
}

// delete a blog
const remove = async (req, res) => {
  // Your code here
}

// Update blog using PATCH
const update = async (req, res) => {
  // Your code here
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

module.exports = {
  list,
  get,
  create,
  delete: remove,
  update
}