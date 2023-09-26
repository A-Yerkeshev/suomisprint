require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const coursesRouter = require('./routes/coursesRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');

// express app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running!'));

// routes
app.use('/api/courses', coursesRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => console.log(`Server started on port ${port}`));