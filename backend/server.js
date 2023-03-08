const dotenv = require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const Task = require('./models/taskModel');
const taskRoutes = require('./routes/taskRoute');
const cors = require('cors');

const app = express();

// Middleware
app.use(express.json()); //get json data from body
app.use(express.urlencoded({extended: false})); // get data from urlencoded
app.use(cors({
  origin: ['http://localhost:3000', 'https://mern-task-app.onrender.com', 'https://mern-task-app-ya5p.onrender.com'],
}));
app.use('/api/tasks', taskRoutes);


// Routes
app.get('/', (req, res) => {
  res.send('Home Page');
});

const PORT = process.env.PORT || 5000;

//connect to mongodb
mongoose.set("strictQuery", false);
mongoose
.connect(process.env.MONGO_URI)
.then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err))
