const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// GET /api/courses
const list = async (req, res) => {
  const courses = await Course.find({}).sort({createdAt: -1});
  res.status(200).json(courses);
}

// GET /api/courses/:id
const get = async (req, res) => {
  const {id}  = req.params;

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid course id.`});
    return;
  }

  const course = await Course.findById(id);

  if (!course) {
    res.status(404).json({error: `Course with id ${id} was not found.`});
    return;
  }

  res.status(200).json(course);
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

  res.status(200).json(course);
}

// POST /api/courses
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
    res.status(400).json({error: `${providerId} is not valid value for providerId.`});
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
  } catch (err) {
    res.status(500).json({error: `Failed to save new course. Error: `});
  }
}

// PATCH /api/courses/:id
const update = async (req, res) => {
  const {id} = req.params;

  if (!validId(id)) {
    res.status(400).json({error: `${id} is not a valid course id.`});
    return;
  }

  const course = await Course.findOneAndUpdate({_id: id}, {...req.body}, {new: true});

  if(!course) {
    res.status(404).json({error: `Course with id ${id} was not found.`});
    return;
  }

  res.status(200).json(course);
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