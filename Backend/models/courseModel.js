const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({
  title: {type: String, required: true},
  provider_id: {type: Schema.ObjectId}, // Will be required later
  description: {type: String},
  short_description: {type: String},
  image_url: {type: String},
  price: {type: Number, required: true},
  max_students: {type: Number},
  enrolled: {type: Number},
  start_date: {type: Date, required: true},
  end_date: {type: Date, required: true},
  start_time: {type: Number, required: true},
  end_time: {type: Number, required: true}
}, {timestamps: true})

module.exports = mongoose.model('Course', courseSchema)