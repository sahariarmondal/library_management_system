const express = require('express');
const sequelize = require('./config/db_config.js');
const {  Student, Course, Book, Author, BookCopy, StudentCart, BookAllocation, Fine } = require('./models/association.js');
const Admin = require('./models/admin.js');
// const Author = require('./models/author.js');
// const Book = require('./models/book.js');
require('dotenv').config();
const app = express();
const port = 3000;
const bodyParser = require('body-parser');
const insertDummyData = require('./entry.js');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to the database using environment variables
const dbPassword = process.env.DB_PASSWORD;
const dbUser = process.env.DB_USER;
const dbDatabase = process.env.DB_DATABASE;
const dbHost = process.env.DB_HOST;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    await sequelize.sync({ alter: true}); 
    console.log('All models synchronized.');

    // insertDummyData();

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

