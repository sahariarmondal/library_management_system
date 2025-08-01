const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const BookCopy = sequelize.define("BookCopy", {
  copy_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  book_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  availability_status: {
    type: DataTypes.ENUM("available", "issued", "reserved"),
    defaultValue: "available",
    allowNull: false
  }
}, {
  tableName: "book_copies",
  timestamps: true,
});

module.exports = BookCopy;
