require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const mongoose = require("mongoose");
const coursesRouter = require('./routes/coursesRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');
const logger = require('./utils/logger')
const config = require('./utils/config')


// express app
const app = express();

//const port = process.env.PORT || 3001;


connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    logger.info(req.path, req.method);
    next();
  });
  



// routes
app.use('/api', coursesRouter);
app.use('/api/users', usersRouter);

app.get('/', (req, res) => res.send('API Running!'));

// connect to db
// mongoose
//   .connect(config.MONGO_URI)
//   .then(() => {
//     logger.info("Connected to db");
//   })
//   .catch((error) => {
//     logger.error(error);
//   });

module.exports = app;
//app.listen(port, () => console.log(`Server started on port ${port}`));