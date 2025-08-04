const sequelize = require("../config/db_config.js");
const { DataTypes } = require("sequelize");

const StudentCart = sequelize.define("StudentCart", {
  student_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references:{
      model: 'students',
      key: 'student_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  },
  book_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    references:{
      model: 'books',
      key: 'book_id'
    },
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
  }
}, {
  tableName: "student_cart",
  timestamps: false,
});

module.exports = StudentCart;


