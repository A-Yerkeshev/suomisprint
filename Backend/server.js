require('dotenv').config();
const connectDB = require('./config/db');
const express = require('express');
const coursesRouter = require('./routes/coursesRouter');
const usersRouter = require('./routes/usersRouter');
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

// express app
const app = express();

const port = process.env.PORT || 3001;

connectDB();

// middleware
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('API Running!'));

// routes
app.use('/api', coursesRouter);
app.use('/api/users', usersRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => console.log(`Server started on port ${port}`));