const express = require('express');
const sequelize = require('./config/db_config.js');
const {  Student, Course, Book, Author, BookCopy, StudentCart, BookAllocation, Fine } = require('./models/association.js');
const Admin = require('./models/admin.js');
const bookRouter = require('./routes/bookRoute.js');
const authorRouter = require('./routes/authorRoute.js');
require('dotenv').config();
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const insertDummyData = require('./entry.js');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    await sequelize.sync({ alter: true}); 
    console.log('All models synchronized.');

    app.listen(port, () => {
      console.log(`Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error(' Database connection failed:', error);
  }
};

startServer();


app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API');
})
