const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {type: String, required: true},
  provider_id: {type: Schema.ObjectId}, // Will be required later
  description: {type: String},
  short_description: {type: String},
  level: {type: String},
  image_url: {type: String},
  price: {type: Number},
  max_students: {type: Number},
  enrolled: {type: Array},
  start_date: {type: Date},
  end_date: {type: Date},
  start_time: {type: Number},
  end_time: {type: Number}
}, {timestamps: true})

module.exports = mongoose.model("Course", courseSchema);
