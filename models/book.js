const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const Book = sequelize.define('Book', {
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },

  title: {
    type: DataTypes.STRING,
    allowNull: false
  },

  isbn: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },

  genre: {
    type: DataTypes.ENUM('Fiction', 'Non-Fiction', 'Science', 'Biography', 'Comics', 'Other'),
    allowNull: false
  },
 
  published_year: {
    type: DataTypes.INTEGER,
    allowNull: true
  },

  language: {
    type: DataTypes.STRING,
    allowNull: true
  },

  total_copies: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },

  available_copies: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  },
   active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },


}, {
  tableName: 'books',
  timestamps: true // createdAt, updatedAt
});

module.exports = Book;
