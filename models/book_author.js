const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");
const Book = require("./book.js");
const Author = require("./author.js");

const BookAuthor = sequelize.define('BookAuthor', {
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'books',
      key: 'book_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  },
  auth_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'authors',
      key: 'auth_id'
    },
    onDelete: 'RESTRICT',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: 'book_authors',
  timestamps: false 
});

module.exports = BookAuthor;