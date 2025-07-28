const express = require('express');
const connectToDatabase = require('./config/db_config');
require('dotenv').config();
const app = express();
const port = 3000;
const bodyParser = require('body-parser');

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

const sequelize = connectToDatabase(dbDatabase, dbUser, dbPassword, dbHost);

app.get('/', (req, res) => {
  res.send('Welcome to the Library Management System API');
})
// Export the sequelize instance for use in other modules