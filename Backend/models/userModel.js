const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  email: {type: String},
  phone: {type: String},
  role: {type: Number, required: true} // 0-customer, 1-provider
}, {timestamps: true});

module.exports = mongoose.model("User", userSchema);