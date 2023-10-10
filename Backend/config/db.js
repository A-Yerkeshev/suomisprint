const mongoose = require("mongoose");

const MONGO_URI =
  process.env.NODE_ENV === "test"
    ? process.env.MONGO_URI_TEST
    : process.env.MONGO_URI;

// full connection string

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
    });
    console.log(`Connected to database`);
  } catch (error) {
    console.log(error);
  }
};

// const connectDB = async () => {
//     const conn = await mongoose.connect(MONGO_URI)
//     console.log(`Connected to database`)
// }

module.exports = connectDB;
