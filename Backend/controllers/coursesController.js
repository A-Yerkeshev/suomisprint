const Course = require('../models/courseModel')
const mongoose = require('mongoose')

// GET /courses
const list = async (req, res) => {
  const courses = await Course.find({}).sort({createdAt: -1})
  res.status(200).json(courses)
}

// get a single blog
const get = async (req, res) => {
  // Your code here
}

// delete a blog
const remove = async (req, res) => {
  // Your code here
}

// Update blog using PATCH
const update = async (req, res) => {
  // Your code here
}


const create = async (req, res) => {
  // Your code here
}


module.exports = {
  list,
  get,
  create,
  delete: remove,
  update
}