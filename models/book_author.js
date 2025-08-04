const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");
const Book = require("./book.js");
const Author = require("./author.js");

const BookAuthor = sequelize.define('BookAuthor', {
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  author_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'book_authors',
  timestamps: false 
});

module.exports = BookAuthor;