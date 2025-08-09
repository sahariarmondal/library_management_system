const express = require('express');
const sequelize = require('./config/db_config.js');
const {  Student, Course, Book, Author, BookCopy, StudentCart, BookAllocation, Fine } = require('./models/association.js');
// const Admin = require('./models/admin.js');
const bookRouter = require('./routes/bookRoute.js');
const authorRouter = require('./routes/authorRoute.js');
const authRouter = require('./routes/authRoute.js');
require('dotenv').config();
const app = express();
const port = 3000;
const bookAuthorRouter = require('./routes/bookAuthorRoute.js');
const transactionRouter = require('./routes/transactionRouter.js');

const authenticate = require('./middleware/authMiddleware.js');
const bookRequestRouter = require('./routes/bookRequestRoute.js');
// const insertDummyData = require('./entry.js');

app.use(express.json());

app.use('/api/auth', authRouter);

app.use("/api", authenticate);

app.use(express.urlencoded({ extended: true }));
app.use('/api/book', bookRouter);
app.use('/api/author', authorRouter);
app.use('/api/book-auth', bookAuthorRouter );
app.use('/api/transaction', transactionRouter );
app.use('/api/book-request', bookRequestRouter);



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
})

const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to the database successfully.');

    // await sequelize.sync({force: true}); 
    // await sequelize.sync({alter: true});
     await sequelize.sync(); 
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
